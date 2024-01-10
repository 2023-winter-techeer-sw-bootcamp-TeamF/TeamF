require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { configureAwsClient } = require('./aws/awsClientConfig'); // AWS 클라이언트 설정
const { GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager"); // GetSecretValueCommand 가져오기
const { loadDBConfig, getDBConfig } = require('./mysql/configDB');
const db = require('./mysql/database');
const { loadGptApiKey, initializeGpt } = require('./chatgpt/apiKey');
const gpt = require('./chatgpt/api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger_output.json');
const s3 = require('./aws/awsS3');

const app = express();
const secretName = "MySQL_Info";
const secretGptApiKey = "GPT_KEY";

// Express 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS 설정
const corsOptions = {
  origin: function (origin, callback) {
    if (['https://43.202.208.226:3000', 'http://43.202.208.226:3001'].indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 라우팅 설정
app.use('/tarot', require('./routes/tarot'));
app.use('/result', require('./routes/result'));
app.use('/user', require('./routes/user'));
app.use('/mypage', require('./routes/mypage'));
app.use('/test', require('./routes/test/test'));
app.use('/secret', require('./routes/test/secretsManager'));

// 공통 응답 미들웨어
app.use(require('./middleware/commonResponse'));

// 404 핸들러
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not found.' });
});

// 오류 처리 미들웨어
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '서버 내부 오류' });
});

// 서버 시작 함수
async function startServer() {
  try {
    const client = configureAwsClient();
    const secrets = await client.send(new GetSecretValueCommand({ SecretId: secretName }));
    await loadDBConfig(client, secretName);
    const dbConfig = getDBConfig();
    db.initializeConnection(dbConfig);
    // gpt api 연결
    const gptApiKey = await loadGptApiKey(client, secretGptApiKey);
    gpt.initializeGpt(gptApiKey);
    // s3 연결
    s3.initializeS3();

    // 서버 시작
    const port = 3000;
    app.listen(port, () => console.log(`서버가 포트 ${port}에서 실행 중입니다.`));
  } catch (error) {
    console.error("시작 중 오류 발생:", error);
  }
}

startServer();
