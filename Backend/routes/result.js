const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const gptApi = require('../chatgpt/api.js');
const router = express.Router();

router.post('/', async (req, res, next) => {
    /*
    #swagger.tags = ['Result']
    #swagger.summary = "Todo: 결과 리스트, 결과 상세조회, 결과 삭제"
    #swagger.description = '/list /detail /deswaggerlete'
    #swagger.tags = ['Result']
    #swagger.summary = "GPT 데이터 요청"
    #swagger.description = '카드 정보를 정수형으로 전달하면 해당 카드의 정보를 반환함'
    #swagger.responses[200] = {
        description: 'GPT-3 API 요청 성공',
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
        description: '유효하지않은 카드 정보',
        schema: {
            message: 'request is null or undefined'
        }
    }
    #swagger.responses[400] = {
        description: '유효하지않은 질문 정보',
        schema: {
            message: 'request is null or undefined'
        }
    }
    #swagger.responses[500] = {
        description: 'GPT-3 API 요청 중 오류 발생',
        schema: {
            message: 'GPT-3 API 요청 중 오류 발생',
            error: 'error'
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
    console.log(cards);
    const ask = req.query.ask;
    let messages = [];
    let gptAnswers = [];
    let answers = {};
    let cardNum = 1;

    if(!cards) {
        res.locals.status = 400;
        res.locals.data = { message: '유효하지않은 카드 정보' };
        return next();
    }

    if(!ask) {
        res.locals.status = 400;
        res.locals.data = { message: '유효하지않은 질문 정보' };
        return next();
    }

    // messages.push(prompt); - 프롬프팅된 메시지를 넣을 예정
    //answers['prompt'] = prompt;
    // 카드정보를 순차적으로 messages에 넣는다.
    for (let card of cards) {
        messages.push(card+'\n');
        answers['card'+ cardNum] = card;
        cardNum++;
    }

    // 질문을 넣는다.
    messages.push(ask);
    answers['ask'] = ask;

    console.log('answer : ', answers);
    console.log('messages : ', messages.join(''));

    try {
        // gpt에게 메시지를 보내고 스트림 형태로 데이터를 받는다.
        const stream = await gptApi.getGptStream(gptApi.gptMessageForm('user', messages.join('')));

        // 스트림에서 데이터를 받는다.
        for await (const chunk of stream) {
            if(chunk['choices'][0]['delta']['content']) {
                console.log(chunk['choices'][0]['delta']['content']);
                //res.write(chunk['choices'][0]['delta']['content']);
                gptAnswers.push(chunk['choices'][0]['delta']['content']);
            }
        }
        answers['answer'] = await gptAnswers.join('');
        
        res.locals.data = JSON.stringify(answers);
        //res.end();

    } catch (error) {
        res.locals.status = 500;
        res.locals.data = { message: 'GPT-3 API 요청 중 오류 발생', error };
        throw error;
        return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
    next();
});

module.exports = router;