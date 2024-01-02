const express = require('express');
const app = express();

// 기본 포트 설정 -> 3000 사용
const PORT = 3000;

// 루트 경로 라우팅 -> GET 요청 처리
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// port:3000 리스닝
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
