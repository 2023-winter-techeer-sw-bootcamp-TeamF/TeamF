const express = require('express');
const cors = require('cors');
const app = express();

// express.json(): 클라이언트로부터 오는 JSON 형식의 요청 본문을 파싱하여 JavaScript 객체로 변환.
app.use(express.json());

// express.urlencoded(): 클라이언트로부터 오는 URL 인코딩된 요청 본문을 파싱하여 JavaScript 객체로 변환. 주로 HTML 폼 데이터 처리에 사용.
app.use(express.urlencoded({ extended: false }));

 //swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_output.json');
//swagger UI 사용 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//cors 허용 출처
const corsConfig = {
  origin: 'http://43.202.208.226:3000',
  credentials: true,
};
//cors 사용 설정
app.use(cors(corsConfig));

// 루트 경로 핸들러
app.get('/', (req, res, next) => {
  res.locals.data = { message: 'Page : app.js -> dev 테스트' };
  next();
});

// API 라우트 설정
const testRouter = require('./routes/test/test');
app.use('/test', testRouter);

// 공통 응답 미들웨어
const commonResponseMiddleware = require('./middleware/commonResponse');
app.use(commonResponseMiddleware);

// 404 핸들러(Page Not found)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not found.' });
});

// 오류 처리 미들웨어 (Server Error)
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
      message: '서버 내부 오류'
  });
});

const port = 3000;
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행`);
});