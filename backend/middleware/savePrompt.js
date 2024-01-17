const s3 = require('../aws/awsS3');
const db = require('../mysql/database');

// mysqlDB에 prompt를 내용을 저장하는 미들웨어
const savePrompt = async (req, res, next) => {
  if(res.locals.data) return next();

  const { cardArray, ask, cardAnswerArray, answer, poll_id, luckType, masterName } = res.locals.store;

  const connection = db.getConnection();

  try {
    // 타로 종합 결과 저장 (Promise 사용)
    const insertResult = new Promise((resolve, reject) => {
      // 타로 종합 결과 저장 쿼리
      const result_query =
        'INSERT INTO result (poll_id, question, explanation, master_name, luck) VALUES (?, ?, ?, ?, ?)';
      const result_params = [poll_id, ask, answer, masterName, luckType];
      connection.query(result_query, result_params, (error, results, fields) => {
        if (error) {
          res.locals.status = 500;
          res.locals.data = { message: '종합 결과 저장 중, 데이터베이스 오류', error: error.message };
          reject(new Error('DB Error'));
        } else {
          resolve(results.insertId);
        }
      });
    });

    // 배열인 카드 저장 쿼리 실행 및 결과 기다림
    const insertCards = cardArray.slice(0, cardArray.length).map((cardNum, index) => {
      const cardIndex = s3.findIndex(cardNum);
      card = s3.getDataObject(cardIndex);
      return new Promise((resolve, reject) => {
        const cards_query =
          'INSERT INTO card (poll_id, image_url, explanation, eng_name, kor_name, ordered) VALUES (?, ?, ?, ?, ?, ?)';
        const cards_params = [
          poll_id,
          s3.getS3ImageURL(cardIndex),
          cardAnswerArray[index],
          card.english,
          card.name,
          index,
        ];
        connection.query(cards_query, cards_params, (error, results, fields) => {
          if (error) {
            res.locals.status = 500;
            res.locals.data = { message: '카드 저장 중, 데이터베이스 오류', error: error.message };
            reject(new Error('DB Error'));
          } else resolve(results.insertId);
        });
      });
    });

    await insertResult; // 결과 저장이 완료될 때까지 기다림
    await Promise.all(insertCards); // 카드 저장이 완료될 때까지 기다림

    // 결과 저장이 완료된 poll 테이블의 complete 열을 1로 업데이트
    await new Promise((resolve, reject) => {
      const updateCompleteQuery = 'UPDATE poll SET complete = 1 WHERE id = ?';
      connection.query(updateCompleteQuery, [poll_id], (error) => {
        if (error) {
          res.locals.status = 500;
          res.locals.data = { message: '폴 아이디 조회 중, 데이터베이스 오류', error: error.message };
          reject(new Error('DB Error'));
        } 
        resolve();
      });
    });

    res.locals.status = 200;
    res.locals.data = { message: '결과 저장 성공' };
    next();
  } catch (error) {
    next();
  }
};

module.exports = savePrompt;
