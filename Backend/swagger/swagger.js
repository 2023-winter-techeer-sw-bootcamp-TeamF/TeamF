const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Taro API Test',
    description: '오늘도 화이팅',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../app.js', '../routes/userInfo.js']; // Express 앱의 엔트리 포인트를 지정

//문서 업데이트 명령어 : node ./swagger/swagger.js
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../app.js'); // 스웨거 문서 업데이트 시 자동으로 express 재시작
});
