const express = require('express');
const gptStreamResponse = require('../middleware/gptStreamResponse');
const gpt = require('../chatgpt/api');
const { toVerifyCardArray } = require('../card/toCardVaild');
const GptMessage = require('../chatgpt/message');
const StreamJson = require('../chatgpt/streamJson');
const commonResponse = require('../middleware/commonResponse');
const router = express.Router();

router.post('/', async (req, res, next) => {
    /*
    #swagger.tags = ['Stream']
    #swagger.summary = "타로 결과 GPT 요청"
    #swagger.description = '타로 결과를 API에 요청하고 결과를 반환함'
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
    const { cards, ask } = req.query;
    const io = req.app.get('io'); // app 객체에 저장된 io 객체를 가져옴
    const userId = '123'; // 임시로 사용자 ID를 지정
    const socketId = await gptStreamResponse.getSocketId(userId);
    console.log('socketId : ' + socketId);

    // 유효한 정보인지 검사하는 기능
    if (!cards || !ask) {
      res.status(400).json({ error: '유효하지 않은 데이터입니다. (널 값, 누락 등)' });
      return;
    }

    // 카드 정보를 받아옴
    let cardsArray = toVerifyCardArray(cards);
    console.log('cardArray : ' + cardsArray);
    let receivedMessage = [];
    let recv = [];
    let messages = new GptMessage();

    const fs = require('fs');
    const text = fs.readFileSync('./routes/test/test.txt', 'utf8');

    messages.addSystemMessage('JSON 형태로 데이터를 보내줘.');
    messages.addUserMessage(text);
    //messages.addUserMessage(cardsArray.join('\n'));

    // socket.io를 연결
    try {
      io.to(socketId).emit('success', '연결 성공');
      console.log('유저(' + userId + '): 연결 성공');
    } catch (error) {
      console.log(error);
    }

    try {
      const streamJson = new StreamJson();
      console.log('messages : ' + messages.getMessages());
      const gptStream = await gpt.getGptJsonStream(messages.getMessages());

      for await (const chunk of gptStream) {
        if (chunk['choices'][0]['delta']['content']) {
          console.log(chunk['choices'][0]['delta']['content']);
          receivedMessage.push(chunk.choices[0]?.delta?.content || '');
          //const message = streamJson.parse(chunk.choices[0]?.delta?.content || '')
          const message = streamJson.parseByIndex(chunk.choices[0]?.delta?.content || '', 3);
          recv.push(message);
          if (message != '') io.to(socketId).emit('message', message);
        }
      }

      console.log(receivedMessage.join(''));
      console.log('recv :' + recv.join(''));
      res.locals.data = receivedMessage.join(''); // 조회 결과 → res.locals.data에 저장
    } catch (error) {
      if (error) {
        res.locals.status = 500;
        res.locals.data = { message: '데이터 조회 중 오류 발생 : ', error: error.message };
        return next(); // 오류 발생 → commonResponse 미들웨어로 이동
      }
    }

    try {
      io.to(socketId).emit('finish', '연결 종료');
    } catch (error) {
      console.log(error);
    }

    next();
  }, commonResponse);

module.exports = router;
