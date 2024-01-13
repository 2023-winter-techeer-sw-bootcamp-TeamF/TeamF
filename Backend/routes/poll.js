const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();

router.get('/create', (req, res, next) => {
    // #swagger.tags = ['Tarot']
    // #swagger.security = [{ "Bearer": [] }]
    // #swagger.summary = "타로 시작 시 Poll(임시저장) → 타로 시작 할 경우 뽑은 카드와 결과 저장을 구별할 Poll Table"
    // #swagger.description = '뽑은 카드 결과 저장 및 총 결과 저장 시 사용됨'
    const user_id = req.user.id;

    // 데이터베이스 연결 및 쿼리 실행
    const connection = db.getConnection();
    const query = 'INSERT INTO poll (user_id) VALUES (?)';
    connection.query(query, [user_id], (error, results, fields) => {
        if (error) {
            /* #swagger.responses[500] = {
                description: 'DB 저장 과정에서 오류 발생 시의 응답',
                schema: { message: 'DB 저장 오류', error: '에러 내용' }
            } */
            console.log(error);  // 오류의 상세한 내용을 로그로 출력
            return res.status(500).send({ message: 'DB 저장 오류', error: error.message });
        } else {
            res.locals.data = { message: 'Poll ID 생성 완료', pollId: results.insertId };
            next();
        }
    });
    /* #swagger.responses[200] = {
        description: 'Poll ID가 성공적으로 생성되었을 때의 응답',
        schema: {
            status: "success",
            statusCode: 200,
            data: {
                message: 'Poll ID 생성 완료',
                pollId: 0 
            }
        }
    } */
    /* #swagger.responses[401] = {
        description: 'DB 저장 과정에서 오류 발생 시의 응답',
        schema: { message: '엑세스 토큰이 없습니다.', error: '엑세스 토큰이 필요합니다' }
    } */
}, commonResponse); // commonResponse 미들웨어를 체인으로 추가

module.exports = router;