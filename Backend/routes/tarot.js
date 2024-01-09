const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Tarot']
    // #swagger.summary = "Todo: 운세 카테고리 선택, 가이드라인, 질문 전송, 뽑은 것 조회, 카드 이미지 반환"
    // #swagger.description = '/select /guide /ask /cards /card/info'
    res.locals.data = { message: 'Page : tarot.js' };
    next();
});

// 가이드라인
router.get('/guide', (req, res, next) => {
    // Swagger 문서화
    // #swagger.summary = "가이드라인 페이지 이동 테스트"
    // #swagger.description = '가이드라인 페이지 이동 테스트'
    // #swagger.tags = ['Tarot']
    /*  #swagger.responses[200] = {
            description: '페이지 이동 테스트 성공',}
        } */
    /*  #swagger.responses[400] = {
            description: '잘못된 요청',
        } */
    
    // req = {
    //     luckType : ,
    //     option : ,
    // }
    const luckType = req.body.luckType; // 운 종류
    // const option = req.body.option; // 뽑을 사람 수

    // 운 카테고리 Table에서 가이드라인 내용 조회
    const connection = db.getConnection();
    connection.query('SELECT * FROM luck_list WHERE type = ?', [luckType], (error, luck_results, fields) => {
        if (error) {
        res.locals.status = 500;
        res.locals.data = { message: '운 카테고리 Table에서 데이터 조회 중 오류 발생', error };
        return next(); // 오류 발생 → commonResponse 미들웨어로 이동
        }

        // 조회 결과 → res.locals.data에 저장
        res.locals.data = { luck_results }; 
        next(); // commonResponse 미들웨어 이동
    });
}, commonResponse); // commonResponse 미들웨어를 체인으로 추가

// 뽑은 카드 저장
router.get('/cards', (req, res, next) => {
    // Swagger 문서화
    // #swagger.summary = "뽑은 카드 저장 페이지 이동 테스트"
    // #swagger.description = '뽑은 카드 저장 페이지 이동 테스트'
    // #swagger.tags = ['Tarot']
    /*  #swagger.responses[200] = {
            description: '페이지 이동 테스트 성공',}
        } */
    /*  #swagger.responses[400] = {
            description: '잘못된 요청',
        } */
    
    // 뽑은 카드 Table에 뽑은 카드 정보 추가
    const connection = db.getConnection();
    const sql = "INSERT INTO cards (poll_seq, UserSeq, ordered, image_url, explanation, created_at, partner) "
                + "values(?,?,?,?,?,NOW(),?)";
    const params = [req.body.poll_seq, req.body.UserSeq, req.body.ordered, req.body.image_url, 
                    req.body.explanation, req.body.partner];
    connection.query(sql, params, (error, fields) => {
        if (error) {
        res.locals.status = 500;
        res.locals.data = { message: '뽑은 카드 Table에 데이터 추가 중 오류 발생', error };
        return next(); // 오류 발생 → commonResponse 미들웨어로 이동
        }

        res.locals.data = { message: '뽑은 카드 Table에 데이터 추가 성공' }; 
        next(); // commonResponse 미들웨어 이동
    });
}, commonResponse); // commonResponse 미들웨어를 체인으로 추가

module.exports = router;