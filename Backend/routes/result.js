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
           type: 'integer',
           example: '12345'
   } */
    /* #swagger.parameters['poll_id'] = {
            in: 'query',
            description: '폴 아이디',
            required: true,
            type: 'integer',
            example: '56789'
    } */
    /* #swagger.parameters['requestData'] = {
            in: 'body',
            description: '타로 결과 및 뽑은 카드 정보 저장을 위한 요청값',
            required: true,
            type: 'object',
            schema: {
                "question": "any",
                "result_explanation": "any",
                "master_name": "any",
                "luck_type": "any",
                "cards": [
                    {
                        "card_image_url": "url3",
                        "card_explanation": "explanation3",
                        "card_eng_name": "eng3",
                        "card_kor_name": "kor3"
                    },
                    {
                        "card_image_url": "url3",
                        "card_explanation": "explanation3",
                        "card_eng_name": "eng3",
                        "card_kor_name": "kor3"
                    }
                ]
            },
            example : {
                "question": "any",
                "result_explanation": "any",
                "master_name": "any",
                "luck_type": "any",
                "cards": [
                    {
                        "card_image_url": "url3",
                        "card_explanation": "explanation3",
                        "card_eng_name": "eng3",
                        "card_kor_name": "kor3"
                    },
                    {
                        "card_image_url": "url3",
                        "card_explanation": "explanation3",
                        "card_eng_name": "eng3",
                        "card_kor_name": "kor3"
                    }
                ]
            }
        }; */
    
    const { user_id, poll_id } = req.query;
    const { requestData } = req.body;
 
    // 누락 여부 체크
    if (!requestData.user_id) {
        /* #swagger.responses[400] = {
            description: '요청된 사용자 ID가 누락되었을 때의 응답',
            schema: { message: '유저 아이디 누락' }
        } */
        res.locals.status = 400;
        res.locals.data = { message: "유저 아이디 누락" };
        res.locals.success = false;
        return next();
    }

    if (!requestData.poll_id) {
        /* #swagger.responses[400] = {
            description: '요청된 Poll ID가 누락되었을 때의 응답',
            schema: { message: 'Poll 아이디 누락' }
        } */
        res.locals.status = 400;
        res.locals.data = { message: "Poll 아이디 누락" };
        res.locals.success = false;
        return next();
    }

    if (!requestData.question) {
        /* #swagger.responses[400] = {
            description: '요청된 사용자 질문이 누락되었을 때의 응답',
            schema: { message: '사용자 질문 누락' }
        } */
        res.locals.status = 400;
        res.locals.data = { message: "사용자 질문 누락" };
        res.locals.success = false;
        return next();
    }

    if (!requestData.result_explanation) {
        /* #swagger.responses[400] = {
            description: '요청된 종합 결과가 누락되었을 때의 응답',
            schema: { message: '종합 결과 누락' }
        } */
        res.locals.status = 400;
        res.locals.data = { message: "종합 결과 누락" };
        res.locals.success = false;
        return next();
    }

    if (!requestData.master_name) {
        /* #swagger.responses[400] = {
            description: '요청된 타로 마스터 이름이 누락되었을 때의 응답',
            schema: { message: '타로 마스터 이름 누락' }
        } */
        res.locals.status = 400;
        res.locals.data = { message: "타로 마스터 이름 누락" };
        res.locals.success = false;
        return next();
    }
    
    if (!requestData.cards || Object.keys(requestData.cards).length == 0) {
        /* #swagger.responses[400] = {
            description: '요청된 운 종류가 누락되었을 때의 응답',
            schema: { message: '운 종류 누락' }
        } */
        res.locals.status = 400;
        res.locals.data = { message: "운 종류 누락" };
        res.locals.success = false;
        return next();
    }

    // 타로 결과 Table에 타로 결과 저장
    const connection = db.getConnection();
    const results_query = "INSERT INTO results (poll_id, user_id, question, explanation, master_name, luck, created_at) "
                + "VALUES(?, ?, ?, ?, ?, ?, NOW())";
    const results_params = [poll_id, user_id, requestData.question, requestData.result_explanation, requestData.master_name, requestData.luck_type];
    connection.query(results_query, [results_params], (error, results, fields) => {
        if (error) {
            /* #swagger.responses[500] = {
                description: '타로 결과 Table에 데이터 저장 중 오류가 발생했을 때의 응답',
                schema: { message: '타로 결과 Table에 데이터 저장 중 오류 발생' }
                } */
            res.locals.status = 500;
            res.locals.data = { message: '타로 결과 Table에 데이터 저장 중 오류 발생', error };
            return next();
        }
        else {
            resultsId = results.insertId;
            res.locals.data = { message : '타로 결과 Table에 데이터 저장 성공', resultsId: results.insertId };
        }
    });

    for(const card in requestData.cards) {
        // 뽑은 카드 Table에 뽑은 카드 정보 저장
        const cards_query = "INSERT INTO cards (poll_id, image_url, explanation, eng_name, kor_name, ordered, created_at) "
                + "VALUES(?, ?, ?, ?, ?, 0, NOW())";
        connection.query(cards_query, [poll_id, card.card_image_url, card.card_explanation, card.card_eng_name, card.card_kor_name], (error, results, fields) => {
            if (error) {
                /* #swagger.responses[500] = {
                    description: '뽑은 카드 Table에 데이터 저장 중 오류가 발생했을 때의 응답',
                    schema: { message: '뽑은 카드 Table에 데이터 저장 중 오류 발생' }
                    } */
                res.locals.status = 500;
                res.locals.data = { message: '뽑은 카드 Table에 데이터 저장 중 오류 발생', error };
                return next();
            }
            else {
                cardsId.push(results.insertId);
                res.locals.data = { message : '뽑은 카드 Table에 데이터 저장 성공', cardsId: results.insertId };
            }
        });

    }

    /* #swagger.responses[200] = {
                    description: '타로 결과, 뽑은 카드 정보 저장 성공',
                    schema: { message: '타로 결과, 뽑은 카드 정보 저장 성공' },
                    } */
    res.locals.data = { message: '타로 결과, 뽑은 카드 정보 저장 성공' };
    next();
});



module.exports = router;