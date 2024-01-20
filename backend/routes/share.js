const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const db = require("../mysql/database.js");
const s3 = require("../aws/awsS3.js");
const router = express.Router();

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
      const resultQuery =
        "SELECT question, explanation, luck, master_name FROM result WHERE poll_id = ?";
      const resultData = await new Promise((resolve, rejects) => {
        connection.query(resultQuery, [poll_id], (error, result) => {
          if (error) {
            res.locals.status = 500;
            res.locals.data = { message: "DB 쿼리 오류", error: error.message };
            rejects(new Error("DB 오류: result에서 데이터 조회 중 오류 발생"));
          }
          resolve(result);
        });
      });

      const cardsQuery =
        "SELECT image_url, explanation, eng_name FROM card WHERE poll_id = ?";
      const cardData = await new Promise((resolve, rejects) => {
        connection.query(cardsQuery, [poll_id], (error, cardData) => {
          if (error) {
            res.locals.status = 500;
            res.locals.data = { message: "DB 쿼리 오류", error: error.message };
            rejects(new Error("DB 오류: card에서 데이터 조회 중 오류 발생"));
          }
          resolve(cardData);
        });
      });

      res.locals.data = {
        result: resultData.length > 0 ? resultData : "데이터가 없음",
        card: cardData.length > 0 ? cardData : "데이터가 없음",
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