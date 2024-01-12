const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const gptApi = require('../chatgpt/api.js');
const router = express.Router();

router.post('/stream', async (req, res, next) => {
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
    if(!cards || !ask) {
        res.locals.status = 400;
        res.locals.data = { message: '데이터가 유효하지 않습니다. (널값, 누락 등)' };
        return next();
    }

    // 문자열로 들어온 카드 정보를 배열로 만든다.
    if(typeof cards === 'string') {
        let buffer = cards.split(',');
        for (let card of buffer) {
            cardsArray.push(card);
        }
    }

    // 객체형태의 카드 정보 가져온다. 현재 문제는 없지만 만약 문제가 생긴다면 수정 예정
    if(typeof cards === 'object') {
        cardsArray = cards;
    }

    // messages.push(prompt); - 프롬프팅된 메시지를 넣을 예정
    //answers['prompt'] = prompt;
    // 카드정보를 순차적으로 messages에 넣는다.
    for (let card of cardsArray) {
        messages.push(card);
        answers['card'+ cardNum] = card;
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
            if(chunk) {
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
}, commonResponse); // commonResponse 미들웨어를 체인으로 추가

router.post('/save', (req, res, next) => {
    // Swagger 문서화
    // #swagger.summary = "종합 결과 저장"
    // #swagger.description = '종합 결과 저장'
    // #swagger.tags = ['Result']
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: '타로 결과 및 뽑은 카드 정보 저장을 위한 요청값',
        required: true,
        schema: {
            poll_id : '12345',
            question : '사용자 질문',
            result_explanation : '종합 결과',
            master_name : '마스터 이름',
            luck : '운 종류',
            cards : [
                {
                    "card_image_url": "url1",
                    "card_explanation": "explanation1",
                    "card_eng_name": "eng1",
                    "card_kor_name": "kor1"
                }
            ],
        }
    } */
    
    const { poll_id, question, result_explanation, master_name, luck, cards } = req.body;
 
    // 누락 여부 체크
    let missingParameter = null;

    if (!poll_id) {
        missingParameter = "Poll 아이디 누락";
    } 
    else if (!question) {
        missingParameter = "사용자 질문 누락";
    } 
    else if (!result_explanation) {
        missingParameter = "종합 결과 누락";
    } 
    else if (!master_name) {
        missingParameter = "타로 마스터 이름 누락";
    } 
    else if (!luck) {
        missingParameter = "운 종류 누락";
    } 
    else if (!cards || Object.keys(cards).length == 0) {
        missingParameter = "뽑은 카드 정보 누락";
    }

    if (missingParameter) {
        /* #swagger.responses[400] = {
            description: '요청된 값이 누락되었을 때의 응답',
            schema: { message: 'missingParameter' }
        } */
        res.locals.status = 400;
        res.locals.data = { message: missingParameter };
        res.locals.success = false;
        return next();
    }

    // 타로 종합 결과 Table에 Insert 성공한 id
    let resultId = null;

    // 타로 종합 결과 Table에 타로 결과 저장
    const connection = db.getConnection();
    const result_query = "INSERT INTO result (poll_id, question, explanation, master_name, luck, created_at) "
                + "VALUES(?, ?, ?, ?, ?, NOW())";
    const result_params = [poll_id, question, result_explanation, master_name, luck];
    connection.query(result_query, [result_params], (error, results, fields) => {
        if (error) {
            /* #swagger.responses[500] = {
                description: '타로 종합 결과 Table에 데이터 저장 중 오류가 발생했을 때의 응답',
                schema: { message: '타로 종합 결과 Table에 데이터 저장 중 오류 발생' }
                } */
            res.locals.status = 500;
            res.locals.data = { message: '타로 종합 결과 Table에 데이터 저장 중 오류 발생', error };
            return next();
        }
        else {
            resultId = results.insertId;
            // res.locals.data = { message : '타로 종합 결과 Table에 데이터 저장 성공', resultId: results.insertId };
        }
    });

    // 뽑은 카드별 결과 Table에 Insert 성공한 id 배열
    let cardId = [];

    for(const card in cards) {
        
        let ordered = 0; // 뽑은 순서

        // 뽑은 카드별 결과 Table에 뽑은 카드 정보 저장
        const cards_query = "INSERT INTO card (poll_id, image_url, explanation, eng_name, kor_name, ordered, created_at) "
                + "VALUES(?, ?, ?, ?, ?, ?, NOW())";
        connection.query(cards_query, [poll_id, card.card_image_url, card.card_explanation, card.card_eng_name, card.card_kor_name, ordered], (error, results, fields) => {
            if (error) {
                /* #swagger.responses[510] = {
                    description: '뽑은 카드별 결과 Table에 데이터 저장 중 오류가 발생했을 때의 응답',
                    schema: { message: '뽑은 카드별 결과 Table에 데이터 저장 중 오류 발생' }
                    } */
                res.locals.status = 510;
                res.locals.data = { message: '뽑은 카드별 결과 Table에 데이터 저장 중 오류 발생', error };
                return next();
            }
            else {
                cardId.push(results.insertId);
                // res.locals.data = { message : '뽑은 카드별 결과 Table에 데이터 저장 성공', cardId: results.insertId };
            }
        });

        ordered++; // 뽑은 순서 증가

    }

    /* #swagger.responses[200] = {
            description: '타로 종합 결과, 뽑은 카드별 정보 저장 성공',
            schema: { message: '타로 종합 결과, 뽑은 카드별 정보 저장 성공' },
        } */
    res.locals.data = { message: '타로 종합 결과, 뽑은 카드별 정보 저장 성공', resultId, cardId };
    next();
});



module.exports = router;
