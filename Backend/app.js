const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");
const { loadDBConfig, getDBConfig } = require('./mysql/configDB');
const db = require('./mysql/database');

const client = new SecretsManagerClient({ region: "ap-northeast-2" });
const secretName = "MySQL_Info";

const app = express();
// express.json(): 클라이언트로부터 오는 JSON 형식의 요청 본문을 파싱하여 JavaScript 객체로 변환.
app.use(express.json());

// express.urlencoded(): 클라이언트로부터 오는 URL 인코딩된 요청 본문을 파싱하여 JavaScript 객체로 변환. 주로 HTML 폼 데이터 처리에 사용.
app.use(express.urlencoded({ extended: false }));

//cors 허용 출처
const corsOptions = {
  origin: function (origin, callback) {
    if (['http://43.202.208.226:3000', 'http://43.202.208.226:3001'].indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_output.json');
//swagger UI 사용 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 루트 경로 핸들러
app.get('/', (req, res, next) => {
  res.locals.data = { message: 'Page : app.js' };
  next();
});

// router → ./routes/tarot
const tarotRouter = require('./routes/tarot');
app.use('/tarot', tarotRouter);

// router → ./routes/result
const resultRouter = require('./routes/result');
app.use('/result', resultRouter);

// router → ./routes/user
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// router → ./routes/mypage
const mypageRouter = require('./routes/mypage');
app.use('/mypage', mypageRouter);

// router → ./routes/test/test
const testRouter = require('./routes/test/test');
app.use('/test', testRouter);

// router → ./routes/test/SecretsManager
const secretTestRouter = require('./routes/test/secreatsManager');
app.use('/secret', secretTestRouter);

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

// 데이터베이스 설정 로드 및 애플리케이션 시작
// async 함수로 서버 시작 로직을 감싸기
async function startServer() {
  try {
    // 데이터베이스 설정 로드
    await loadDBConfig(client, secretName);

    // DB 설정 가져오기 및 연결 초기화
    const dbConfig = getDBConfig();
    db.initializeConnection(dbConfig);

    // 서버 시작
    const port = 3000;
    app.listen(port, () => {
      console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
    });
  } catch (error) {
    // 오류 처리
    console.error("DB 설정 로드 중 오류 발생:", error);
  }
}

// 서버 시작 함수 실행
startServer();

