const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Result']
    // #swagger.summary = "Todo: 결과 리스트, 결과 상세조회, 결과 삭제"
    // #swagger.description = '/list /detail /delete'
    res.locals.data = { message: 'Page : result.js' };
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