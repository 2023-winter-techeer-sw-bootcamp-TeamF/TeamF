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

module.exports = router;