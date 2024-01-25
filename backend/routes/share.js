const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const db = require("../mysql/database.js");
const s3 = require("../aws/awsS3.js");
const router = express.Router();
const resultQuery = require("../bases/resultQuery.js");
const cardsQuery = require("../bases/cardsQuery.js");

router.get(
  "/",
  async (req, res, next) => {
    /*
     #swagger.tags = ['Share']
     #swagger.summary = "결과 공유 Detail 조회"
     #swagger.description = '결과(Poll_id)를 통해 해당 결과를 상세조회한다.'
     #swagger.parameters['poll_id'] = {
        in: 'query',
        description: '폴 아이디 입력',
        required: true,
        example: 'Poll_ID',
        value: '',
    } 
     #swagger.responses[404] = {
        description: '해당 ID를 가진 폴이 존재하지 않습니다.',
        schema: { error: '해당 ID를 가진 폴이 존재하지 않습니다.' }
     } 
     #swagger.responses[500] = {
        description: '내부 서버 오류로 인한 DB 쿼리 실패',
        schema: { 
          message: '내부 서버 오류로 인한 DB 쿼리 실패', 
          error: '내부 서버 오류로 인한 DB 쿼리 실패'
        }
      }
      #swagger.responses[200] = {
        description: '총합 결과와 카드별 해석 및 링크 데이터 성공적으로 조회됨.',
        schema: {
          result: 'result 결과 조회 성공',
          card: 'card 결과 조회 성공'
        }
      }
      */
    const { poll_id } = req.query;
    const connection = db.getConnection();

    try {
      const pollInfo = await new Promise((resolve, reject) => {
        const pollSearchQuery =
          "SELECT DATE_FORMAT(created_at, '%Y-%m-%d') AS created_date FROM poll WHERE id = ? AND complete = 1;";
        connection.query(pollSearchQuery, [poll_id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      if (pollInfo.length === 0) {
        return res
          .status(404)
          .send({ message: "해당 ID를 가진 폴이 존재하지 않습니다." });
      }

      const resultData = await resultQuery(connection, res, poll_id, next);
      const cardData = await cardsQuery(connection, res, poll_id, next);

      res.locals.data = {
        date: pollInfo,
        result: resultData,
        card: cardData,
      };

      return next();
    } catch (error) {
      console.error(error);
      res.locals.data = { message: error.message };
      res.locals.status = 500;
      return next();
    }
  },
  commonResponse
);

module.exports = router;
