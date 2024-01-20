const db = require("../mysql/database.js");

const checkPoll = async (req, res, next) => {
    try {
        const { poll_id } = req.query;
        const connection = db.getConnection();
        // 폴 아이디 조회 (Promise 사용)
        const poll = await new Promise((resolve, reject) => {
          const poll_query = 'SELECT * FROM poll WHERE id = ?';
          connection.query(poll_query, [poll_id], (error, results) => {
            if (error) {
              res.locals.status = 500;
              res.locals.data = { message: '폴 아이디 조회 중, 데이터베이스 오류', error: error.message };
              reject(new Error('DB Error'));
            } else if (results.length === 0) {
              res.locals.status = 400;
              res.locals.data = { message: '폴 아이디가 유효하지 않습니다.' };
              reject(new Error('Invalid Poll ID'));
            } else if (results[0].complete === 1) {
              res.locals.status = 400;
              res.locals.data = { message: '이미 결과를 저장하셨습니다.' };
              reject(new Error('Poll Already Complete'));
            } else {
              resolve(results[0]);
            }
          });
        });
        res.locals.poll = await poll_id;
        next();
      } catch (error) {
        res.status(res.locals.status).json(res.locals.data);
      }
}
module.exports = checkPoll;