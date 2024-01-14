const express = require('express');
const socketConnection = require('../middleware/socketConnection');
const { toVerifyCardArray } = require('../card/toCardVaild');
const GptMessage = require('../chatgpt/message');
const StreamJson = require('../chatgpt/streamJson');
const gpt = require('../chatgpt/api');
const commonResponse = require('../middleware/commonResponse');
const s3 = require('../aws/awsS3');
const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    /*
    #swagger.tags = ['Stream']
    #swagger.summary = "타로 결과 GPT 요청"
    #swagger.description = '타로 결과를 API에 요청하고 결과를 반환함'
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
    # swagger.parameters['userId'] = {
        in: 'query',
        description: '유저 아이디',
        required: true,
        type: 'string',
        example: 'yunki',
        schema: {
            userId: 'yunki'
        }
    }
    #swagger.parameters['cards'] = {
        in: 'query',
        description: '카드 배열',
        required: true,
        type: 'array',
        example: '[Ace of Wands, Ace of Cups, Ace of Swords]',
        schema: {
            cards: '[Ace of Wands, Ace of Cups, Ace of Swords]'
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
    */

    // 변수 선언
    const { userId, cards, ask } = req.query; // 사용자 아이디, 카드 배열, 질문 저장
    console.log('req.query.userId : ' + userId);
    const sendExplainIndex = 3; // 보낼 카드 번호
    let cardsArray = []; // 카드 배열
    let numOfExplain = 1; // 해석의 수
    let clientRecv = new String(); // 사용자가 받은 메시지 저장
    let messages = new GptMessage(); // gpt 메시지 객체
    const streamJson = new StreamJson(); // 스트림 json 객체 생성
    let resultArray; // 결과 배열
    let resultAnswer = new String(); // 결과 메시지
    let cardAnswerArray = new Array(); // 결과 배열

    // socket.io 연결
    const io = req.app.get('io'); // app 객체에 저장된 io 객체를 가져옴
    const socketId = socketConnection.getSocketId(userId); // 사용자 아이디를 통해 소켓 아이디를 가져옴
    console.log('socketId : ' + socketId);

    // 유효한 정보인지 검사하는 기능
    if (!cards || !ask) {
      res.status(400).json({ error: '유효하지 않은 데이터입니다. (널 값, 누락 등)' });
      return next();
    }

    // 카드 배열을 유효한지 확인
    if (cards.length === 0) {
      res.status(400).json({ error: '카드 배열이 비어있습니다.' });
      return next();
    }

    // 카드 배열의 값이 유효한지 확인
    for (const card of cards) {
      if (card.length === 0) {
        res.status(400).json({ error: '카드 배열에 유효하지 않은 값이 있습니다.' });
        return next();
      }

      if (card < 1 || card > 78) {
        res.status(400).json({ error: '카드 배열에 유효하지 않은 값이 있습니다.' });
        return next();
      }
    }

    //cardsArray = toVerifyCardArray(cards); // 카드 데이터를 유효한 데이터 형태인 배열로 정리 - 쿼리문으로 받아오는 경우
    for (const card of cards) {
      const cardIndex = s3.findIndex(card); // 카드 번호를 통해 S3에서 파일의 인덱스를 가져옴
      const cardData = await s3.getDataObject(cardIndex); // 파일명을 통해 데이터를 가져옴
      cardsArray.push(cardData.english);
      numOfExplain++;
    }

    // 결과 배열 생성
    resultArray = Array.from({length: numOfExplain}, () => ''); // 결과 배열 생성

    // gpt 메시지 생성
    messages.addUserTestMessage();
    messages.addUserMessage(ask);
    messages.addUserCardsArrayMessage(cardsArray);
    messages.addUserJsonFormMessage();

    // socket.io를 연결
    io.to(socketId).emit('start', '데이터 전송 시작');
    console.log('유저(' + userId + '): 연결 성공');

    try {
      console.log('Send To GPT : ' + messages.getMessages().join(''));
      const gptStream = await gpt.getGptJsonStream(messages.getMessages());

      // gpt 스트림 데이터를 받는다.
      for await (const chunk of gptStream) {
        const gptChunkMessage = chunk.choices[0]?.delta?.content || '';

        if (gptChunkMessage) {
          const resultIndex = streamJson.getIndex();
          const streamMessage = streamJson.parse(gptChunkMessage); // 스트림 데이터를 파싱

          resultArray[resultIndex] += streamMessage; // 파싱한 데이터를 배열에 저장
          clientRecv += streamMessage; // 사용자가 받은 메시지 저장

          if(resultIndex == sendExplainIndex && streamMessage != '') 
            io.to(socketId).emit('message', streamMessage); // 소켓으로 메시지 전송
        }
      }

      for (let i = 0; i < numOfExplain - 1; i++) {
        cardAnswerArray[i] = resultArray[i];
      }

      resultAnswer += resultArray[numOfExplain-1];

      console.log('Client Recv : ' + clientRecv);
      io.to(socketId).emit('finish', '데이터 전송 완료');

      res.locals.data = {
        userId: userId,
        cardArray: cardsArray,
        ask: ask,
        cardAnswerArray: cardAnswerArray,
        answer: resultAnswer
      }; // 조회 결과 → res.locals.data에 저장

    } catch (error) {
      res.locals.status = 500;
      res.locals.data = { message: '스트리밍 중 오류 발생 : ', error: error.message };
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
    next();
  }
);

module.exports = router;

router.post(
  '/stream',
  async (req, res, next) => {
    /*
  #swagger.tags = ['Result']
  #swagger.summary = "타로 결과 GPT 요청"
  #swagger.description = '타로 결과를 API에 요청하고 결과를 반환함'
  #swagger.tags = ['Result']
  #swagger.summary = "GPT 데이터 요청"
  #swagger.description = '카드 정보를 정수형으로 전달하면 해당 카드의 정보를 반환함'
  #swagger.responses[200] = {
      description: 'GPT API 요청 성공',
      schema: {
          json: {
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
      example: '[Ace of Wands, Ace of Cups, Ace of Swords]',
      schema: {
          cards: '[Ace of Wands, Ace of Cups, Ace of Swords]'
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
  */
    // 변수 선언
    const cards = req.query.cards;
    const ask = req.query.ask;
    let messages = [];
    let gptAnswers = [];
    let cardsArray = [];
    let answers = {};
    let cardNum = 1;

    // 누락 여부 체크
    if (!cards || !ask) {
      res.locals.status = 400;
      res.locals.data = { message: '데이터가 유효하지 않습니다. (널값, 누락 등)' };
      return next();
    }

    // 문자열로 들어온 카드 정보를 배열로 만든다.
    if (typeof cards === 'string') {
      let buffer = cards.split(',');
      for (let card of buffer) {
        cardsArray.push(card);
      }
    }

    // 객체형태의 카드 정보 가져온다. 현재 문제는 없지만 만약 문제가 생긴다면 수정 예정
    if (typeof cards === 'object') {
      cardsArray = cards;
    }

    // messages.push(prompt); - 프롬프팅된 메시지를 넣을 예정
    //answers['prompt'] = prompt;
    // 카드정보를 순차적으로 messages에 넣는다.
    for (let card of cardsArray) {
      messages.push(card);
      answers['card' + cardNum] = card;
      cardNum++;
    }

    // 질문을 넣는다.
    messages.push(ask);
    answers['ask'] = ask;

    try {
      // gpt에게 메시지를 보내고 스트림 형태로 데이터를 받는다.
      const stream = await gptApi.getGptStream(gptApi.gptMessageForm('user', messages.join('')));
      // 스트림에서 데이터를 받는다.
      for await (const chunk of stream) {
        // 스트림 데이터의 형식에 따라 데이터를 추출한 형태
        if (chunk) {
          console.log(chunk.choices[0]?.delta?.content || '');
          //res.write(chunk.choices[0]?.delta?.content || '');  //스트림을 사용할 경우 res.write()를 사용한다.
          gptAnswers.push(chunk.choices[0]?.delta?.content || '');
        }
      }
      // 스트림 데이터를 문자열로 변환하여 반환한다.
      answers['answer'] = await gptAnswers.join('');
      //await res.end(); //스트림을 사용할 경우 res.end()를 사용한다.

      res.locals.data = JSON.stringify(answers); // 조회 결과 → res.locals.data에 저장
    } catch (err) {
      res.locals.status = 500;
      res.locals.data = { message: 'GPT API 요청 중 오류 발생', error: err.message };
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }

    // 결과를 DB에 저장한다. (일단 보류)
    // try {
    //     const connection = db.getConnection();

    //     const query = "INSERT INTO temp_result (user_id, json) VALUES (?, ?)";

    //     connection.query(query, [user_id, JSON.stringify(answers)], (error, results, fields) => {
    //         if (error) {
    //             res.locals.status = 500;
    //             res.locals.data = { message: '데이터 저장 중 오류 발생', error };
    //             return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    //         }
    //         else {
    //             res.locals.data = { message: '데이터 저장 성공' };
    //         }
    //     });
    // }
    // catch (err) {
    //     res.locals.status = 500;
    //     res.locals.data = { message: '데이터 저장 중 오류 발생', error: err.message };
    //     return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    // }

    next();
  },
  commonResponse
); // commonResponse 미들웨어를 체인으로 추가
