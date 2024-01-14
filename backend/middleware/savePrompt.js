// mysqlDB에 prompt를 내용을 저장하는 미들웨어
const savePrompt = (req, res, next) => {
  // 데이터가 없으면 다음 미들웨어로 넘김
  if (!res.locals.data) return next();

  

module.exports = savePrompt;
