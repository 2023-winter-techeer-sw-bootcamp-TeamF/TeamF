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

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Tarot']
    // #swagger.summary = "Todo: 운세 카테고리 선택, 가이드라인, 질문 전송, 뽑은 것 조회, 카드 이미지 반환"
    // #swagger.description = '/select /guide /ask /cards /card/info'
    res.locals.data = { message: 'Page : tarot.js' };
    next();
});

router.get('/poll/create', (req, res, next) => {
    // #swagger.tags = ['Tarot']
    // #swagger.summary = "타로 시작 시 Poll(임시저장) → 타로 시작 할 경우 뽑은 카드와 결과 저장을 구별할 Poll Table"
    // #swagger.description = '뽑은 카드 결과 저장 및 총 결과 저장 시 사용됨'

    /* #swagger.parameters['userid'] = {
           in: 'query',
           description: '사용자의 ID',
           required: true,
           type: 'string',
           example: '12345'
   } */
    /* #swagger.parameters['partnerid'] = {
            in: 'query',
            description: '파트너의 ID (선택 사항)',
            required: false,
            type: 'string',
            example: '67890'
    } */
    const { userid, partnerid } = req.query;

    if (!userid) {
        return res.status(400).send({ message: 'User ID is required' });
    }

    // 데이터베이스 연결 및 쿼리 실행
    const connection = db.getConnection();
    const query = 'INSERT INTO poll (userid, partnerid) VALUES (?, ?)';

    connection.query(query, [userid, partnerid], (error, results, fields) => {
        if (error) {
            console.error('Error saving poll:', error);
            res.status(500).send({ message: 'Error saving poll' });
        } else {
            res.locals.data = { message: 'Poll created successfully', pollId: results.insertId };
            next();
        }
    });
});

module.exports = router;