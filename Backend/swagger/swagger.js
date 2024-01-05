const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Tarot API Test',
    description: '오늘도 화이팅',
  },
  //host: 'localhost:3000',
  host: '43.202.208.226:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../app.js']; // Express 앱의 엔트리 포인트를 지정

// 문서 업데이트 및 자동실행 명령어 : node ./swagger/swagger.js
// sawgger url : http://localhost:3000/api-docs/#/default/get_api_
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../app.js'); // 스웨거 문서 업데이트 시 자동으로 express 재시작
});
