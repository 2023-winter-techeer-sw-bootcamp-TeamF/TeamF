const express = require('express');
const router = express.Router();

router.get('/user/info', (req, res, next) => {
  // Swagger 문서화
  // #swagger.description = '유저 조회 테스트'
  // #swagger.tags = ['Test']
  /*  #swagger.responses[200] = {
            description: '유저 조회 테스트 성공',}
    } */
  /*  #swagger.responses[400] = {
            description: '잘못된 요청',
    } */

  res.locals.data = {
    userInfo: {
      username: '우리는',
      password: '짱이다',
      email: 'great@example.com',
    },
  };
  next();
});

router.get('/page', (req, res, next) => {
  // Swagger 문서화
  // #swagger.description = '페이지 이동 테스트'
  // #swagger.tags = ['Test']
  /*  #swagger.responses[200] = {
            description: '페이지 이동 테스트 성공',}
    } */
  /*  #swagger.responses[400] = {
            description: '잘못된 요청',
    } */
  res.locals.data = { message: 'Page : test API 성공 !' };
  next();
});

module.exports = router;
