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

module.exports = router;