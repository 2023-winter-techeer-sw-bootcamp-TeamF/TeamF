const express = require('express');
const commonResponse = require('../../middleware/commonResponse');
const db = require('../../mysql/database.js');
const router = express.Router();

router.get('/user/info', (req, res, next) => {
  // Swagger 문서화
  // #swagger.summary = "유저 조회 테스트"
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
  next(); // commonResponse 미들웨어로 이동
}, commonResponse);

router.get('/page', (req, res, next) => {
  // Swagger 문서화
  // #swagger.summary = "페이지 이동 테스트"
  // #swagger.description = '페이지 이동 테스트'
  // #swagger.tags = ['Test']
  /*  #swagger.responses[200] = {
            description: '페이지 이동 테스트 성공',}
    } */
  /*  #swagger.responses[400] = {
            description: '잘못된 요청',
    } */
  res.locals.data = { message: 'Page : test API 성공 !' };
  next(); // commonResponse 미들웨어로 이동
}, commonResponse);

router.get('/testdb', (req, res, next) => {

  // 테스트 데이터 조회 라우트
  // Swagger 문서화
  // #swagger.summary = "DB 테스트"
  // #swagger.description = 'DB를 테스트 해봅시다 :>'
  // #swagger.tags = ['Test']
  /*  #swagger.responses[200] = {
            description: '테스트 값 조회 성공',}
    } */
  /*  #swagger.responses[400] = {
            description: '잘못된 요청',
    } */
  const connection = db.getConnection();
  connection.query('SELECT * FROM testdb', (error, results, fields) => {
    if (error) {
      res.locals.status = 500;
      res.locals.data = { message: '데이터 조회 중 오류 발생', error };
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }

    res.locals.data = { results }; // 조회 결과 → res.locals.data에 저장
    next(); // commonResponse 미들웨어 이동
  });
}, commonResponse); // commonResponse 미들웨어를 체인으로 추가
/**
 * 체인을 추가한다 ?
 * 
 * Express.js의 미들웨어 또는 라우트 핸들러를 순차적으로 연결하는 개념
 * Express.js에서 여러 미들웨어나 라우트 핸들러를 하나의 라우트에 연결할 수 있고,
 * 연결된 것들은 정의된 순서대로 실행되며 이러한 방식이 체이닝(Chaining)이다.
 * 
 * 예제로 아래와 같이 있다고 가정한다면
 * router.get('/somepath', handler1, handler2, handler3);
 * handler1, handler2, handler3dms '/somepath' 경로에 대한 GET 요청을 처리하기 위해 체인으로 연결
 * 이렇게 되면 Express는 요청이 들어오면 handler1을 먼저 실행하고
 * handler1이 next()를 호출하면 handler2가 실행되며 순차적으로 실행되는 형식
 * 
 * 체이닝 방식으로 코드의 모둘화와 재사용성을 높일 수 있고,
 * 복잡한 라우트 로직을 간단 명확하게 구성을 가능.
 * 특정 라우트에 대해 필요한 전처리나 후처리를 편리하게 그낭함.
 * 
 * 결론:
 * commonResponse 미들웨어를 체인으로 추가하는 경우,
 * commonResponse는 라우트의 마지막 단계에서 실행되어 일관된 응답 형식으로 반환하게 됨.
 */

module.exports = router;
