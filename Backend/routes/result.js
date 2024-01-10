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

router.post('/save', (req, res, next) => {
    // Swagger 문서화
    // #swagger.summary = "총합 결과 저장"
    // #swagger.description = '총합 결과 저장'
    // #swagger.tags = ['Result']
     /*  #swagger.responses[200] = {
              description: '테스트 값 조회 성공',}
      } */
    /*  #swagger.responses[400] = {
              description: '잘못된 요청',
      } */
    /* #swagger.parameters['user_id'] = {
           in: 'query',
           description: '유저 고유번호',
           required: true,
           type: 'string',
           example: '12345'
   } */
    /* #swagger.parameters['poll_id'] = {
            in: 'query',
            description: '폴 아이디',
            required: true,
            type: 'string',
            example: '56789'
    } */
    /*
    타로 결과 request 필요 항목
    1. 고민 질문 v
    2. 종합 해석 v
    3. 폴 아이디 v
    4. 유저 고유번호 v
    뽑은 카드 request 필요항목
    1. 폴 아이디 v
    2. 카드 이미지 주소 v
    3. 카드별 해석 v
    4. 영어 카드 이름 v
    5. 한글 카드 이름 v
    */
    const { user_id, poll_id } = req.query;
    const { question, result_explanation, master_name, luck_type, card_image_url, card_explanation, card_eng_name, card_kor_name } = req.body;
    // 누락 여부 체크
    // 타로 결과 Table에 타로 결과 저장
    const connection = db.getConnection();
    const results_query = "INSERT INTO results (poll_id, user_id, question, explanation, master_name, luck, created_at) "
                + "VALUES(?, ?, ?, ?, ?, ?, NOW())";
    connection.query(results_query, [poll_id, user_id, question, result_explanation, master_name, luck_type], (error, results, fields) => {
        if (error) {
            res.locals.status = 500;
            res.locals.data = { message: ' 타로 결과 Table에 데이터 저장 중 오류 발생', error };
            return next();
        }
        else {
            res.locals.data = { message : '타로 결과 Table에 데이터 저장 성공', resultsId: results.insertId };
        }
    });
    // 뽑은 카드 Table에 뽑은 카드 정보 저장 (일단 카드 1장일 경우)
    const cards_query = "INSERT INTO cards (poll_id, image_url, explanation, eng_name, kor_name, ordered, created_at) "
                + "VALUES(?, ?, ?, ?, ?, 0, NOW())";
    connection.query(cards_query, [poll_id, card_image_url, card_explanation, card_eng_name, card_kor_name], (error, results, fields) => {
        if (error) {
            res.locals.status = 500;
            res.locals.data = { message: ' 뽑은 카드 Table에 데이터 저장 중 오류 발생', error };
            return next();
        }
        else {
            res.locals.data = { message : '뽑은 카드 Table에 데이터 저장 성공', cardsId: results.insertId };
        }
    });
    res.locals.data = { message: '타로 결과, 뽑은 카드 정보 저장 성공' };
    next();
});

module.exports = router;