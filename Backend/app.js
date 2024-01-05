const express = require('express');
const swaggerUi = require('swagger-ui-express'); //swagger
const swaggerDocument = require('./swagger/swagger_output.json'); //swagger
const app = express();

// express.json(): 클라이언트로부터 오는 JSON 형식의 요청 본문을 파싱하여 JavaScript 객체로 변환.
app.use(express.json());

// express.urlencoded(): 클라이언트로부터 오는 URL 인코딩된 요청 본문을 파싱하여 JavaScript 객체로 변환. 주로 HTML 폼 데이터 처리에 사용.
app.use(express.urlencoded({ extended: false }));

//swagger UI 사용 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 루트 경로 핸들러
app.get('/', (req, res, next) => {
  res.locals.data = { message: 'Page : app.js' };
  next();
});

// API 라우트 설정
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const userInfoRouter = require('./routes/userInfo');
app.use('/userinfo', userInfoRouter);


// 공통 응답 미들웨어
const commonResponseMiddleware = require('./middleware/commonResponse');
app.use(commonResponseMiddleware);

// 404 핸들러(Page Not found)
app.use((req, res, next) => {
  res.status(404).json({ message: '페이지를 찾을 수 없음.' });
});

// 오류 처리 미들웨어 (Server Error)
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
      message: '서버 내부 오류가 발생'
  });
});

const port = 3000;
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행`);
});