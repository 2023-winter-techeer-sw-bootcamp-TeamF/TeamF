const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const db = require("../mysql/database.js");
const router = express.Router();

router.get("/create", async (req, res, next) => {
  /*
   #swagger.tags = ['Tarot']
   #swagger.security = [{ "Bearer": [] }]
   #swagger.summary = "타로 시작 시 Poll(임시저장) → 타로 시작 할 경우 뽑은 카드와 결과 저장을 구별할 Poll Table"
   #swagger.description = '뽑은 카드 결과 저장 및 총 결과 저장 시 사용됨'
   #swagger.responses[401] = {
          description: 'Unauthorized: 엑세스 토큰을 복호화한 정보(user_id)가 없을 시의 응답',
          schema: { message: '엑세스 토큰이 없습니다.', error: '엑세스 토큰이 필요합니다' }
      }
   #swagger.responses[500] = {
              description: 'DB 저장 과정에서 오류 발생 시의 응답',
              schema: { message: 'DB 저장 오류', error: '타로 결과(poll) Table에 데이터 저장 중 오류 발생' }
          }
   #swagger.responses[200] = {
      description: 'Poll ID가 성공적으로 생성되었을 때의 응답',
      schema: {
          status: "success",
          statusCode: 200,
          data: {
              message: 'Poll ID 생성 완료',
              pollId: 0 
          }
      }
  } */
  let result;
  const user_id = req.user.id;

  try {
    if (!user_id) {
      res.locals.status = 401;
      res.locals.data = {
        message: "엑세스 토큰이 없습니다.",
        error: "엑세스 토큰이 필요합니다",
      };
      throw new Error("poll 생성 실패: 엑세스 토큰이 필요합니다");
    }

    // 데이터베이스 연결 및 쿼리 실행
    const connection = db.getConnection();

    const query = "INSERT INTO poll (user_id) VALUES (?)";
    result = await new Promise((resolve, reject) => {
      connection.query(query, [user_id], (error, results, fields) => {
        if (error) {
          res.locals.status = 500;
          res.locals.data = { message: "DB 저장 오류", error: error.message };
          reject(new Error("poll 생성 실패: DB 저장 오류"));
        }
        resolve(results);
      });
    });

    res.locals.data = {
      message: "Poll ID 생성 완료",
      pollId: result.insertId,
    };

    return next();

  } catch (error) {
    console.error(error.message);
    res.locals.status = 500;
    res.locals.data = { message: error.message };
    return next();
  }
}, commonResponse); // commonResponse 미들웨어를 체인으로 추가


router.get("/list", (req, res, next) => {
  // #swagger.tags = ['MyPage']
  // #swagger.security = [{ "Bearer": [] }]
  // #swagger.summary = "마이 페이지에서 결과 리스트들을 조회하기"
  // #swagger.description = 'JWT토큰에서 사용자의 poll 리스트를 조회'
  const user_id = req.user.id;
  if (!user_id) {
    /* #swagger.responses[401] = {
          description: 'Unauthorized: 엑세스 토큰을 복호화한 정보(user_id)가 없을 시의 응답',
          schema: { message: '엑세스 토큰이 없습니다.', error: '엑세스 토큰이 필요합니다' }
      } */
    res.locals.status = 401;
    res.locals.data = {
      message: "엑세스 토큰이 없습니다.",
      error: "엑세스 토큰이 필요합니다",
    };
    return next();
  } else {
    try {
      const dbCon = db.getConnection();

      const pollSearchQuery = "SELECT id FROM poll WHERE user_id = ? AND complete = 1;";
      dbCon.query(pollSearchQuery, user_id, (error, pollInfo) => {
        if (error) {
          return res
          .status(500)
          .send({ message: "DB 저장 오류", error: error.message });
        }

        if (pollInfo.length === 0) {
          return res.status(404).send({ message: req.user.name + " 사용자의 결과가 없음" });
        }

        const pollIds = pollInfo.map(row => row.id);

        // result 테이블 조회
        const resultQuery = "SELECT poll_id, explanation, luck FROM result WHERE poll_id IN (?);";
        dbCon.query(resultQuery, [pollIds], (error, resultData) => {
          if (error) {
            return res
            .status(500)
            .send({ message: "DB 저장 오류", error: error.message });
          }

          // card 테이블 조회
          const cardQuery = "SELECT poll_id, image_url FROM card WHERE poll_id IN (?);";
          dbCon.query(cardQuery, [pollIds], (error, cardData) => {
            if (error) {
              return res
              .status(500)
              .send({ message: "DB 저장 오류", error: error.message });
            }

            // 결과 조합
            const combinedData = resultData.map(result => {
              return {
                resultInfo: {
                  explanation: result.explanation,
                  luck: result.luck,
                  imageUrls
                    : cardData.filter(card => card.poll_id === result.poll_id).map(card => card.image_url)
                }
              };
            });

            res.json(combinedData);
          });
        });
      });
    } catch (error) {
      return res.status(500).send({ message: "결과 리스트 조회 실패", error: error.message });
    }
  }
}, commonResponse);

module.exports = router;
