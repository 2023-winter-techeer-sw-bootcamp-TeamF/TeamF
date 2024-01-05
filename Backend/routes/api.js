const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
    // Swagger 문서화
    // #swagger.description = '페이지 이동 테스트'
    // #swagger.tags = ['Test']
    /*  #swagger.responses[200] = {
            description: '페이지 이동 테스트 성공',}
    } */
    /*  #swagger.responses[400] = {
            description: '잘못된 요청',
    } */
    res.locals.data = { message: 'Page : api.js' };
    next();
});

module.exports = router;