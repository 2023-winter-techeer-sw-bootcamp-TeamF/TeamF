const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const jwt = require("jsonwebtoken");
const db = require("../mysql/database.js");
const { resolve } = require("path");
const { rejects } = require("assert");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");

router.get(
  "/list",
  (req, res, next) => {
    /*
   #swagger.tags = ['Polls']
   #swagger.security = [{ "Bearer": [] }]
   #swagger.summary = "마이 페이지에서 결과 리스트들을 조회하기"
   #swagger.description = '마이 페이지에서 결과 리스트들을 조회하기 → 토큰 값에서 추출한 userId를 이용'
  */
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

        const pollSearchQuery =
          "SELECT id FROM poll WHERE user_id = ? AND complete = 1;";
        dbCon.query(pollSearchQuery, user_id, (error, pollInfo) => {
          if (error) {
            return res
              .status(500)
              .send({ message: "DB 저장 오류", error: error.message });
          }

          if (pollInfo.length === 0) {
            return res
              .status(404)
              .send({ message: req.user.name + " 사용자의 결과가 없음" });
          }
          const pollIds = pollInfo.map((row) => row.id);

          // result 테이블 조회
          const resultQuery =
            "SELECT poll_id, explanation, luck FROM result WHERE poll_id IN (?);";
          dbCon.query(resultQuery, [pollIds], (error, resultData) => {
            if (error) {
              return res
                .status(500)
                .send({ message: "DB 저장 오류", error: error.message });
            }

            // card 테이블 조회
            const cardQuery =
              "SELECT poll_id, image_url FROM card WHERE poll_id IN (?);";
            dbCon.query(cardQuery, [pollIds], (error, cardData) => {
              if (error) {
                return res
                  .status(500)
                  .send({ message: "DB 저장 오류", error: error.message });
              }
              // 결과 조합
              const combinedData = resultData.map((result) => {
                return {
                  resultInfo: {
                    pollId: result.poll_id,
                    explanation: result.explanation,
                    luck: result.luck,
                    imageUrls: cardData
                      .filter((card) => card.poll_id === result.poll_id)
                      .map((card) => card.image_url),
                  },
                };
              });
              res.json(combinedData);
            });
          });
        });
      } catch (error) {
        return res
          .status(500)
          .send({ message: "결과 리스트 조회 실패", error: error.message });
      }
    }
  },
  commonResponse
);

// '/detail' 라우트
router.get(
  "/detail",
  async (req, res, next) => {
    /*
   #swagger.tags = ['Polls']
   #swagger.security = [{ "Bearer": [] }]
   #swagger.summary = "결과 리스트에서 선택한 결과(poll_id) 상세 조회"
   #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)를 통해 해당 결과를 상세조회한다.'
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
   #swagger.responses[403] = {
      description: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.',
      schema: { error: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.' }
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
      const searchQuery = "SELECT user_id FROM poll WHERE id = ?";
      const result = await new Promise((resolve, reject) => {
        connection.query(searchQuery, [poll_id], (error, result) => {
          if (error) {
            console.error("DB 쿼리 오류:", error);
            res.locals.status = 500;
            res.locals.data = { message: "DB 쿼리 오류", error: error.message };
            reject(new Error("DB 오류: poll에서 user_id 조회 중 오류 발생"));
          }
          resolve(result);
        });
      });

      console.log(result);

      if (result.length === 0) {
        res.locals.status = 404;
        res.locals.data = { message: "해당 ID를 가진 폴이 존재하지 않습니다." };
        throw new Error("DB 오류: 해당 ID를 가진 폴이 존재하지 않습니다.");
      }

      if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id, 10)) {
        res.locals.status = 403;
        res.locals.data = {
          message:
            "JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.",
        };
        throw new Error(
          "DB 오류: JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다."
        );
      }

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

// 결과 삭제 API
// '/delete' 라우트
router.delete(
  "",
  async (req, res, next) => {
    /*
   #swagger.tags = ['Polls']
   #swagger.security = [{ "Bearer": [] }]
   #swagger.summary = "결과 리스트에서 선택한 결과 및 카드 삭제"
   #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)가 삭제된다. -> CASCADE로 result, card 테이블의 관련 데이터도 삭제'
   #swagger.parameters['poll_id'] = {
      in: 'query',
      description: '폴 아이디 입력',
      required: true,
      example: 'Poll_ID',
      value: '',
    } 
   #swagger.responses[500] = {
      description: '내부 서버 오류로 인한 데이터 삭제 실패.',
      schema: { message: 'DB 쿼리 오류', error: 'DB 쿼리 오류'}
    } 
   #swagger.responses[404] = {
      description: '해당 ID를 가진 폴이 존재하지 않습니다.',
      schema: { message: '해당 ID를 가진 폴이 존재하지 않습니다.', error: '해당 ID를 가진 폴이 존재하지 않습니다.' }
    } 
   #swagger.responses[403] = {
      description: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.',
      schema: { message: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.', error: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.' }
    }
   #swagger.responses[200] = {
      description: 'poll id에 매칭되는 column삭제 -> result, card 연쇄 삭제',
      schema: { message: 'poll 삭제 완료'}
    } 
  */
    const { poll_id } = req.query;
    const connection = db.getConnection();

    try {
      const searchQuery = "SELECT user_id FROM poll WHERE id = ?";
      const result = await new Promise((resolve, reject) => {
        connection.query(searchQuery, [poll_id], (error, result) => {
          if (error) {
            res.locals.status = 500;
            res.locals.data = { message: "DB 쿼리 오류", error: error.message };
            reject(new Error("DB 오류: poll에서 user_id 조회 중 오류 발생"));
          }
          resolve(result);
        });
      });

      if (result.length == 0) {
        res.locals.status = 404;
        res.locals.data = { message: "해당 ID를 가진 폴이 존재하지 않습니다." };
        throw new Error("DB 오류: 해당 유저 ID를 가진 폴이 존재하지 않습니다.");
      }

      if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id, 10)) {
        res.locals.status = 403;
        res.locals.data = {
          message:
            "JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.",
        };
        throw new Error("DB 오류: 토큰과 폴 아이디가 일치하지 않습니다");
      }

      const deleteResultQuery = "DELETE FROM poll WHERE id = ?";
      await new Promise((resolve, reject) => {
        connection.query(deleteResultQuery, [poll_id], (error) => {
          if (error) {
            res.locals.status = 500;
            res.locals.data = { message: "DB 쿼리 오류", error: error.message };
            reject(new Error("DB 오류: poll에서 id 삭제 중 오류 발생"));
          }
          resolve();
        });
      });

      res.locals.data = { message: "삭제 성공" };
      return next();
    } catch (error) {
      console.log(error);

      return next();
    }
  },
  commonResponse
);

router.post(
  "",
  async (req, res, next) => {
    /*
   #swagger.tags = ['Polls']
   #swagger.security = [{ "Bearer": [] }]
   #swagger.summary = "뽑은 카드 결과 저장 및 총 결과 저장을 위한 폴 아이디 생성"
   #swagger.description = '타로 시작 시 Poll(임시저장)→ 타로 시작 할 경우 뽑은 카드와 결과 저장을 구별할 Poll Table에 poll_id가 각각 추가됨 (방만들기) → 토큰 값에서 추출한 userId를 이용'
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
  },
  commonResponse
); // commonResponse 미들웨어를 체인으로 추가

module.exports = router;
