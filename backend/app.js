require("dotenv").config();
const express = require("express");
const http = require("http"); // 소켓 io 필요 모듈
const socketIo = require("socket.io"); // 소켓 io 필요 모듈
const cors = require("cors");
const { configureAwsClient } = require("./aws/awsClientConfig"); // AWS 클라이언트 설정
const { GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager"); // GetSecretValueCommand 가져오기
const { loadDBConfig, getDBConfig } = require("./mysql/configDB");
const db = require("./mysql/database");
const { loadGptApiKey, initializeGpt } = require("./chatgpt/apiKey");
const gpt = require("./chatgpt/api");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger_output.json");
const s3 = require("./aws/awsS3");
const verifyToken = require("./middleware/verifyToken");
const socketConnection = require("./middleware/socketConnection");
const { socketSendHandler } = require("./middleware/socketHandle");
const checkPoll = require("./middleware/checkPoll");
const app = express();
const secretName = "MySQL_Info";
const secretGptApiKey = "GPT_KEY";
// Express 미들웨어 설정
app.use(express.json());
const server = http.createServer(app); // http 서버 생성
const io = socketIo(server, {
  // socket.io 서버 생성
  cors: {
    origin: "*", // 모든 오리진 허용
    credentials: true, // 쿠키 허용
  },
}); // socket.io와 서버 연결
app.use(express.urlencoded({ extended: false }));
// 소켓 이벤트 설정
io.use(socketConnection.clientAuthor);
io.use(socketConnection.newClientHandler);
io.on("connection", (socket) => {
  socketConnection.clientConnectedHandler(socket);
});
io.on("disconnect", (socket) => {
  console.log("소켓 연결 해제");
  socketConnection.clientDisconnectHandler(socket);
});
app.set("io", io); // app 객체에 io 객체를 저장
const corsOptions = {
  origin: "*", // 모든 오리진 허용
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
// OPTIONS 요청 처리를 위한 미들웨어
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});
// Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 라우팅 설정
app.use("/v1/tarot", require("./routes/tarot"));
app.use("/v1/share", require("./routes/share"));
app.use("/v1/polls", verifyToken, require("./routes/polls"));
app.use("/v1/users", require("./routes/users"));
// 공통 응답 미들웨어
app.use(require("./middleware/commonResponse"));
// 404 핸들러
app.use((req, res, next) => {
  res.status(404).json({ message: "Page Not found." });
});
// 오류 처리 미들웨어
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "서버 내부 오류" });
});
// 서버 시작 함수
async function startServer() {
  try {
    const client = configureAwsClient();
    const secrets = await client.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );
    await loadDBConfig(client, secretName);
    const dbConfig = getDBConfig();
    db.initializeConnection(dbConfig);
    // gpt api 연결
    const gptApiKey = await loadGptApiKey(client, secretGptApiKey);
    gpt.initializeGpt(gptApiKey);
    // s3 연결
    s3.initializeS3();
    // 서버 시작
    const port = 3001;
    // 기존 app.listen() 대신 server.listen()을 사용
    // HTTP 서버와 소켓 서버가 모두 동일한 포트로 설정
    server.listen(port, () =>
      console.log(`서버와 소켓이 포트 ${port}에서 실행 중입니다.`)
    );
  } catch (error) {
    console.error("시작 중 오류 발생:", error);
  }
}
startServer();
