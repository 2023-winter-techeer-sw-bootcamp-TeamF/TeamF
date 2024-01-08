const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "TODO : 로그인, 회원가입, 로그아웃"
    // #swagger.description = '/login /signup /logout'

    res.locals.data = { message: 'Page : user.js' };
    next();
});

module.exports = router;