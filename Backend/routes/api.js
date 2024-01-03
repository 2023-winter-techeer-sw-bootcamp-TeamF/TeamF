const express = require('express');
const router = express.Router();

/**
 * 라우트 핸들러에서 공통 응답 미들웨어에서 사용할 데이터를 설정
 * 
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 * @param {function} next - 다음 미들웨어로 제어를 넘기기 위한 콜백 함수
 */
router.get('/', (req, res, next) => {

    res.locals.status = 200;
    res.locals.data = { message: 'Page : api.js' };
    next();
});

module.exports = router;