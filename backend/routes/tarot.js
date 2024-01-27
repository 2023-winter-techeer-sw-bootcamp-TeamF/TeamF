const express = require("express");
const socketConnection = require("../middleware/socketConnection");
const { createVerifyCardObjectArray } = require("../card/toCardVaild");
const GptMessage = require("../chatgpt/message");
const StreamJson = require("../chatgpt/streamJson");
const gpt = require("../chatgpt/api");
const commonResponse = require("../middleware/commonResponse");
const s3 = require("../aws/awsS3");
const { socketFinishHandler } = require("../middleware/socketHandle");
const savePrompt = require("../middleware/savePrompt");
const db = require("../mysql/database.js");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { socketSendHandler } = require("../middleware/socketHandle");
const checkPoll = require("../middleware/checkPoll");
const middleware = [verifyToken, checkPoll, socketSendHandler];
const { clovaTTS } = require("../middleware/clovaTTS.js");

router.get(
  "/option",
  async (req, res, next) => {
    // Swagger 문서화
    // #swagger.summary = '가이드라인 불러오기'
    // #swagger.description = '운 종류와 뽑는 사람 수를 전달하면 가이드라인(content)과 타로 마스터 이름(master_name)을 반환함'
    // #swagger.tags = ['Tarot']
    /* #swagger.parameters['luckType'] = {
         in: 'query',
         description: '운 종류',
         required: true,
         type: 'string',
         example: '오늘의 운세, 연애운, 우정운, 재물운, 소망운',
         value: 'test_luck"
      } */
    /* #swagger.parameters['luckOpt'] = {
          in: 'query',
          description: '카드를 뽑는 사람의 수',
          required: true,
          type: 'integer',
          example: '0(혼자 보는 경우), 1(같이 보는 경우)',
          value: '0'
      } */
    /*  #swagger.responses[200] = {
          description: '테스트 값 조회 성공',
          schema: {
          message: "가이드라인과 타로 마스터 이름 불러오기 성공",
          data: {
              "master_name": "test_master_name",
              "content": "test_content"
              }
          }
      } */
    /*  #swagger.responses[400] = {
          description: '잘못된 요청',
          schema: {
          message: '운 종류나 뽑는 사람 수가 없습니다.'
          }
  } */
    /*  #swagger.responses[500] = {
           description: 'DB 조회 과정에서 오류 발생 시의 응답',
           schema: {
              "message": "DB 조회 오류",
              "error": "운 카테고리 Table에서 데이터 조회 중 오류 발생"
              }
      } */

    const { luckType, luckOpt } = req.query;

    // async/await을 사용하여 비동기 처리
    try {
      if (!luckType || !luckOpt) {
        res.locals.status = 400;
        res.locals.data = { message: "운 종류나 뽑는 사람 수가 없습니다." };
        throw new Error("운 종류나 뽑는 사람 수가 없습니다.");
      }

      // DB 연결
      const connection = db.getConnection();

      // 쿼리가 성공하면 resolve를 호출하여 결과를 반환하고, 실패하면 reject를 호출하여 에러를 반환
      const getLuckList = (luckType, luckOpt) => {
        return new Promise((resolve) => {
          // 운 카테고리 Table에서 가이드라인 내용 조회
          const query = "SELECT * FROM luck_list WHERE luck = ? AND opt = ?";
          connection.query(
            query,
            [luckType, luckOpt],
            (error, results, fields) => {
              if (error) {
                res.locals.status = 500;
                res.locals.data = { message: "DB 조회 오류", error };
                throw new Error(
                  "운 카테고리 Table에서 데이터 조회 중 오류 발생"
                );
              }

              resolve(results);
            }
          );
        });
      };

      const results = await getLuckList(luckType, luckOpt);

      if (results.length <= 0)
        throw new Error("운 카테고리 Table에서 데이터 조회 중 오류 발생");

      // 조회 성공 시, 타로 마스터 이름과 가이드라인 내용 전달
      res.locals.data = {
        master_name: results[0].master_name,
        content: results[0].content,
      };
      return next();
    } catch (error) {
      console.error(error);
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
  },
  commonResponse
); // commonResponse 미들웨어를 체인으로 추가

router.get(
  "/card",
  async (req, res, next) => {
    /*
   #swagger.tags = ['Tarot']
   #swagger.summary = "카드 정보 조회"
   #swagger.description = '카드 정보를 정수형으로 전달하면 해당 카드의 정보를 반환함'
   #swagger.responses[200] = {
          description: '카드 정보 불러오기 성공 url 전송',
          schema: {
              message: 'creat image url successfully',
              name: '카드 이름',
              english: '카드 영어 이름',
              mean: '카드 뜻',
              image_url: '카드 이미지 url'
          }
      } 
    #swagger.responses[400] = {
          description: '잘못된 카드 번호 요청',
          schema: { message: '카드 번호가 없습니다.' }
      } 
    #swagger.responses[500] = {
          description: 'S3 관련 오류 발생 시의 응답',
          schema: { message: '카드 정보를 가져오는데 실패했습니다.' }
      } 
   #swagger.parameters['card'] = { 
      in: 'query',
      description: '카드 번호', 
      required: true,
      type: 'integer',
      example: '1',
      schema: {
        card: 1
      }
  } */

    let result = null;
    let dataObject = null;
    const cardNum = req.query.card; // 카드 번호 저장

    try {
      if (!cardNum) {
        res.locals.status = 400;
        res.locals.data = { message: "카드 넘버가 없습니다." };
        throw new Error("카드 넘버가 없습니다.");
      }

      if (cardNum < 1 || cardNum > 78) {
        res.locals.status = 400;
        res.locals.data = { message: "카드 넘버가 잘못되었습니다." };
        throw new Error("카드 넘버가 잘못되었습니다.");
      }

      const cardIndex = await s3.findIndex(cardNum); // 카드 번호를 통해 S3에서 파일의 인덱스를 가져옴
      result = await s3.getS3ImageURL(cardIndex); // 파일명을 통해 S3에서 이미지 주소를 가져옴
      dataObject = await s3.getDataObject(cardIndex); // 파일명을 통해 데이터를 가져옴

      res.locals.data = {
        message: "create image url successfully",
        name: dataObject.name,
        english: dataObject.english,
        mean: dataObject.mean,
        image_url: result,
      };

      return next();
    } catch (error) {
      console.error(error);
      res.locals.status = 500;
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
  },
  commonResponse
); // commonResponse 미들웨어를 체인으로 추가

router.post(
  "/result",
  middleware,
  async (req, res, next) => {
    /*
    #swagger.tags = ['Tarot']
    #swagger.summary = "타로 결과 GPT 요청 후 저장"
    #swagger.description = '타로 결과를 API에 요청하고 결과를 반환함'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.responses[200] = { 
        description: 'GPT API 요청 성공',
        schema: {
            json: {
                userId: 'yunki',
                card1: 'Ace of Wands',
                card2: 'Ace of Cups',
                card3: 'Ace of Swords',
                ask: '오늘의 운세는 어떤가요?',
                answer: '오늘은 행운이 가득할 거예요!'
            }
        }
    }
    #swagger.responses[400] = {
        description: '유효하지않은 데이터',
        schema: {
            message: '데이터가 유효하지 않습니다. (널값, 누락 등)'
        }
    }
    #swagger.responses[500] = {
        description: 'GPT API 요청 중 오류 발생',
        schema: {
            message: 'GPT에서 오류가 발생해 데이터를 불러올 수 없습니다!',
            error: ''
        }
    }
    #swagger.parameters['cards'] = {
        in: 'query',
        description: '카드 배열',
        required: true,
        type: 'array',
        example: '[1,2,3]',
        schema: {
            cards: [1,2,3]
        }
    }
    #swagger.parameters['ask'] = {
        in: 'query',
        description: '질문',
        required: true,
        type: 'string',
        example: '오늘의 운세는 어떤가요?',
        schema: {
            ask: '오늘의 운세는 어떤가요?'
        }
    }
    #swagger.parameters['luckType'] = {
        in: 'query',
        description: '운 종류',
        required: true,
        type: 'integer',
        example: '1: 오늘의 운세, 2: 연애운, 3: 우정운, 4: 재물운, 5: 소망운',
        schema: {
            luckType: 1
        }
    }
    #swagger.parameters['poll_id'] = {
        in: 'query',
        description: '폴 아이디',
        required: true,
        type: 'integer',
        example: '1',
        schema: {
            poll_id: 1
        }
    }
    */
    // 변수 선언
    const { cards, ask, luckType } = req.query; // 카드 배열, 질문 저장, 운 종류, poll_id
    const poll_id = res.locals.poll; // poll_id
    const socketId = res.locals.socketId; // 소켓 아이디
    const io = req.app.get("io"); // 소켓 io 객체

    try {
      const appConfig = req.app.get("appConfig"); // appConfig 객체
      const promptService = appConfig.promptService(); // promptService 객체
      const luckListService = appConfig.LuckListService(); // luckListService 객체

      const masterName = await luckListService.findMasterNameByNumInPlayAlone(
        luckType
      ); // 마스터 이름 배열
      const luck = await luckListService.findLuckByNumInPlayAlone(luckType); // 운 종류 배열
      const luckid = await luckListService.findIdByNumInPlayAlone(luckType); // 운 종류 배열의 인덱스
      const sizeOfLuckType =
        await luckListService.findSizeOfLuckTypeInPlayAlone(); // 운 종류 배열의 크기
      let cardArray = []; // 카드 배열
      let cardNumArray = []; // 카드 번호 배열
      let cardEngNameArray = []; // 카드 영어 이름 배열
      let numOfExplain = 0; // 해석의 수
      let clientRecv = new String(); // 사용자가 받은 메시지 저장
      let messages = new GptMessage(); // gpt 메시지 객체
      const streamJson = new StreamJson(); // 스트림 json 객체 생성
      let resultArray; // 결과 배열
      let resultAnswer = new String(); // 결과 메시지

      // 유효한 정보인지 검사하는 기능
      if (!cards || !ask || !luckType || !poll_id) {
        res.locals.status = 400;
        res.locals.data = {
          error: "유효하지 않은 데이터입니다. (널 값, 누락 등)",
        };
        return next();
      }

      if (luckType < 1 || luckType > sizeOfLuckType - 2) {
        res.locals.status = 400;
        res.locals.data = { error: "유효하지 않은 운 종류입니다." };
        return next();
      }

      // 카드 배열 생성
      cardArray = await createVerifyCardObjectArray(cards); // 카드 배열 생성
      cardEngNameArray = cardArray.map((card) => card.english); // 카드 영어 이름 배열 생성
      cardNumArray = cardArray.map((card) => card.number); // 카드 번호 배열 생성
      numOfExplain = cardArray.length + 1; // 해석의 수

      // gpt 메시지 생성
      messages.addSystemMessage(await promptService.getSystemPrompt(luckid));
      messages.addUserMessage(await promptService.getUserPrompt(luckid));
      messages.addUserMessage(ask);
      messages.addUserCardsArrayMessage(cardEngNameArray);

      // 결과 배열 생성
      resultArray = Array.from({ length: numOfExplain }, () => ""); // 결과 배열 생성

      const gptStream = await gpt.getGptJsonStream(messages.getMessages());

      // gpt 스트림 데이터를 받는다.
      for await (const chunk of gptStream) {
        const gptChunkMessage = chunk.choices[0]?.delta?.content || "";

        if (gptChunkMessage) {
          const resultIndex = streamJson.getIndex();
          const streamMessage = streamJson.parse(gptChunkMessage); // 스트림 데이터를 파싱

          resultArray[resultIndex] += streamMessage; // 파싱한 데이터를 배열에 저장
          clientRecv += streamMessage; // 사용자가 받은 메시지 저장

          // resultIndex == numOfExplain
          if (streamMessage != "")
            io.to(socketId).emit("message", streamMessage); // 소켓으로 메시지 전송
        }
      }

      cardAnswerArray = resultArray.slice(0, numOfExplain - 1);
      resultAnswer = resultArray[numOfExplain - 1];

      //TTS 이후 음성출력
      const gptResultText = resultArray.join(""); // GPT 결과를 합쳐서 하나의 텍스트로...
      clovaTTS(gptResultText, io.to(socketId), function (err, result) {
        if (err) {
          console.error("Error during TTS:", err);
          // TTS 오류 처리를 원하는 대로 구현
        } else {
          console.log(result);
          // TTS 완료 후에 할 작업을 원하는 대로 구현
        }
      });

      console.log("Client Recv : " + clientRecv);

      if (luck !== "오늘의 운세") {
        res.locals.store = {
          masterName: masterName,
          cardArray: cardNumArray,
          ask: ask,
          cardAnswerArray: cardAnswerArray,
          answer: resultAnswer,
          socketId: socketId,
          poll_id: poll_id,
          luckType: luck, // 운 종류
        }; // 조회 결과 → res.locals.data에 저장
      } else {
        res.locals.store = {
          masterName: masterName,
          cardArray: cardNumArray,
          ask: ask,
          cardAnswerArray: cardAnswerArray,
          answer: cardAnswerArray[0],
          socketId: socketId,
          poll_id: poll_id,
          luckType: luck, // 운 종류
        };
      }

      console.log("Result : " + JSON.stringify(res.locals.store));

      return next(); // 다음 미들웨어로 이동
    } catch (error) {
      res.locals.status = 500;
      res.locals.data = {
        message: "스트리밍 중 오류 발생 : ",
        error: error.message,
      };
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
  },
  socketFinishHandler,
  savePrompt,
  commonResponse
);

module.exports = router;
