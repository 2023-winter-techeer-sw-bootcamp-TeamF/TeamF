const express = require("express");
const socketConnection = require("../middleware/socketConnection");
const { toVerifyCardArray } = require("../card/toCardVaild");
const GptMessage = require("../chatgpt/message");
const StreamJson = require("../chatgpt/streamJson");
const gpt = require("../chatgpt/api");
const commonResponse = require("../middleware/commonResponse");
const s3 = require("../aws/awsS3");
const { socketFinishHandler } = require("../middleware/socketHandle");
const savePrompt = require("../middleware/savePrompt");
const router = express.Router();

router.post(
  "/",
  async (req, res, next) => {
    /*
    #swagger.tags = ['Stream']
    #swagger.summary = "타로 결과 GPT 요청"
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
        example: '1: 오늘의 운세, 2: 애정운, 3: 우정운, 4: 재물운, 5: 소망운',
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
    const luckTypeArray = [
      "오늘의 운세",
      "애정운",
      "우정운",
      "재물운",
      "소망운",
    ]; // 운 종류 배열
    const masterName = ["세레나", "샤를린", "마틸드", "루크", "굴이"]; // 마스터 이름 배열
    const socketId = req.socketId; // 소켓 아이디
    const io = req.app.get("io"); // 소켓 io 객체
    let cardsArray = []; // 카드 배열
    let intCardArray = []; // 카드 번호 배열
    let numOfExplain = 0; // 해석의 수
    let clientRecv = new String(); // 사용자가 받은 메시지 저장
    let messages = new GptMessage(); // gpt 메시지 객체
    const streamJson = new StreamJson(); // 스트림 json 객체 생성
    let resultArray; // 결과 배열
    let resultAnswer = new String(); // 결과 메시지
    let cardAnswerArray = new Array(); // 결과 배열
    res.locals.ignore = true; // commonResponse 미들웨어에서 응답을 보내지 않음

    // 유효한 정보인지 검사하는 기능
    if (!cards || !ask) {
      res.locals.status = 400;
      res.locals.data = {
        error: "유효하지 않은 데이터입니다. (널 값, 누락 등)",
      };
      return next();
    }

    try {
      intCardArray = toVerifyCardArray(cards);
      for (const card of intCardArray) {
        const cardIndex = s3.findIndex(card); // 카드 번호를 통해 S3에서 파일의 인덱스를 가져옴
        const cardData = await s3.getDataObject(cardIndex); // 파일명을 통해 데이터를 가져옴
        cardsArray.push(cardData.english);
        numOfExplain++;
      }
    } catch (error) {
      res.locals.status = 500;
      res.locals.data = {
        message: "데이터 조회 중 오류 발생 : ",
        error: error.message,
      };
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }

    // 결과 배열 생성
    resultArray = Array.from({ length: numOfExplain + 1 }, () => ''); // 결과 배열 생성

    // gpt 메시지 생성
    messages.addUserTestMessage();
    messages.addUserMessage(ask);
    messages.addUserCardsArrayMessage(cardsArray);
    messages.addUserJsonFormMessage();

    try {
      console.log("Send To GPT : " + messages.getMessages().join(""));
      const gptStream = await gpt.getGptJsonStream(messages.getMessages());

      // gpt 스트림 데이터를 받는다.
      for await (const chunk of gptStream) {
        const gptChunkMessage = chunk.choices[0]?.delta?.content || "";

        if (gptChunkMessage) {
          const resultIndex = streamJson.getIndex();
          const streamMessage = streamJson.parse(gptChunkMessage); // 스트림 데이터를 파싱

          resultArray[resultIndex] += streamMessage; // 파싱한 데이터를 배열에 저장
          clientRecv += streamMessage; // 사용자가 받은 메시지 저장

          if (resultIndex == numOfExplain && streamMessage != "")
            io.to(socketId).emit("message", streamMessage); // 소켓으로 메시지 전송
        }
      }

      // 카드 해석 배열 생성
      for (let i = 0; i < numOfExplain; i++) {
        cardAnswerArray[i] = resultArray[i];
      }

      // 결과
      resultAnswer += resultArray[numOfExplain];

      console.log("Client Recv : " + clientRecv);

      res.locals.store = {
        masterName: masterName[luckType - 1],
        cardArray: intCardArray,
        ask: ask,
        cardAnswerArray: cardAnswerArray,
        answer: resultAnswer,
        socketId: socketId,
        poll_id: poll_id,
        luckType: luckTypeArray[luckType - 1], // 운 종류
      }; // 조회 결과 → res.locals.data에 저장

      console.log("Result : " + JSON.stringify(res.locals.store));

      next(); // 다음 미들웨어로 이동
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
