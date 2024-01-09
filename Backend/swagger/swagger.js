const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Tarot API Test',
    description: '오늘도 화이팅',
  },
  /**
   * 테스트할 때는 localhost:3000을 해야 CORS가 안뜸!
   * push할 때는 host: 3001로 해주삼 !
   * (주의) main 배포는...3000으로 해야하나... 여기까지 알아보기는 마음이 지금 아픔
   */
  //host: 'localhost:3000',
  host: '43.202.208.226:3001',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../app.js']; // Express 앱의 엔트리 포인트를 지정

// 문서 업데이트 및 자동실행 명령어 : node ./swagger/swagger.js
// sawgger url : http://43.202.208.226:3000/api-docs/
// sawgger url : http://localhost:3000/api-docs/
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../app.js'); // 스웨거 문서 업데이트 시 자동으로 express 재시작
});
