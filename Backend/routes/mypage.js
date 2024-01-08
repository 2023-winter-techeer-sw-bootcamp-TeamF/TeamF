const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['MyPage']
    // #swagger.summary = "Todo: 총합 결과, 총합 결과 저장"
    // #swagger.description = '/result /result/save'
    res.locals.data = { message: 'Page : mypage.js' };
    next();
});

module.exports = router;