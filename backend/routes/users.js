const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const jwt = require("jsonwebtoken");
const db = require("../mysql/database.js");
const { resolve } = require("path");
const { rejects } = require("assert");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");

// 회원가입, 로그인, 로그아웃, 그리고 로그인시 액세스와 리프레시 토큰(jwt)을 발급하는 기능 등의  API를 다음과 같이 구현했다.

// 회원가입 API
router.post("/signup", async (req, res, next) => {
  /*
  #swagger.tags = ['Users']
  #swagger.summary = "회원가입"
  #swagger.description = '회원가입 하는 유저의 아이디 중복검사 및 가입 하는 유저의 정보를 데이터베이스에 저장'
  #swagger.responses[400] = {
    description: '접근 방식 오류',
    schema: { message: '모두 입력해주세요!', error:'접근 방식 오류'}
  } 
  #swagger.responses[409] = {
    description: '이미 존재하는 아이디',
    schema: { message: '이미 존재하는 아이디 입니다.', error:'중복 에러'}
  } 
  #swagger.responses[500] = {
    description: '회원가입 정보 불러오기 실패',
    schema: { message: '회원가입 정보 불러오기 실패', error: '회원가입 정보 불러오기 실패'}
  } 
  #swagger.parameters['login_id'] = { 
    in: 'query',
    description: '사용자의 아이디', 
    required: true,
    type: 'string',
    example: 'test',
  } 
  #swagger.parameters['password'] = {
    in: 'query',
    description: '비밀번호',
    required: true,
    type: 'string',
    example: '0000'
  } 
  #swagger.parameters['name'] = {
    in: 'query',
    description: '닉네임',
    required: true,
    type: 'string',
    example: '타로마스터'
  }
  */
  try {
    const { login_id, password, name } = req.query;

    // 유효한 정보인지 검사하는 기능
    if (!login_id || !password || !name) {
      res.status(400).json({
        error:
          "유효하지 않은 접근입니다. 아이디, 비밀번호, username을 입력해주세요.",
      });
      return;
    }

    // username과 아이디 중복 체크
    const connection = db.getConnection();
    const checkQuery = "SELECT * FROM user WHERE login_id = ?";
    connection.query(checkQuery, [login_id], (checkError, checkResults) => {
      if (checkError) {
        console.error("Error during signup check:", checkError);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (checkResults.length > 0) {
        // 이미 존재하는 username 또는 아이디인 경우
        res.status(409).json({
          error:
            "이미 존재하는 아이디 또는 username 입니다. 다시 입력해주세요.",
        });
      } else {
        // 존재하지 않는 경우, 사용자 정보를 데이터베이스에 저장
        const insertQuery =
          "INSERT INTO user (login_id, password, name) VALUES (?, ?, ?)";
        connection.query(
          insertQuery,
          [login_id, password, name],
          (insertError, insertResults) => {
            if (insertError) {
              console.error("Error during signup:", insertError);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              res.locals.data = {
                message: "회원가입이 성공적으로 완료 되었습니다!",
              };
              next();
            }
          }
        );
      }
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 로그인 API
router.post("/login", async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "로그인"
  // #swagger.description = '아이디와 비밀번호를 이용하여 로그인을 수행하고, 성공 시 액세스 토큰과 리프레시 토큰을 발급'
  /*  #swagger.responses[400] = {
            description: '접근 방식 오류',
            schema: { message: '접근 방식 오류', error:'접근 방식 오류'}
        } */
  /*  #swagger.responses[401] = {
            description: '유효하지 않은 아이디 또는 비밀번호',
            schema: { message: '존재하지 않는 아이디 또는 비밀번호가 일치하지 않습니다.', error: 'Invalid ID or Password'}
        } */
  /*  #swagger.responses[500] = {
            description: '로그인 정보 불러오기 실패',
            schema: { message: '로그인에 실패 했습니다', error: '로그인 정보 불러오기 실패'}
    } */
  /* #swagger.parameters['body'] = { 
        in: 'body',
        description: '사용자의 아이디', 
        required: true,
        schema: {
            login_id: "test",
            password: "test",
            
        }
    } */

  try {
    const { login_id, password } = req.body;

    // 디비로부터 사용자 정보 조회
    const connection = db.getConnection();
    const query = "SELECT * FROM user WHERE login_id = ? AND password = ?";
    connection.query(query, [login_id, password], (error, results) => {
      if (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (results.length > 0) {
        // 디비와 일치하는 사용자 정보가 있는 경우
        // 로그인 성공 시, 액세스 토큰과 리프레시 토큰 발급
        const accessToken = jwt.sign(
          { id: results[0].id, name: results[0].name },
          "your_secret_key_for_access_token",
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          { id: results[0].id, name: results[0].name },
          "your_secret_key_for_refresh_token",
          { expiresIn: "3d" }
        );

        // 발급받은 리프레시 토큰을 디비에 저장
        const updateRefreshTokenQuery =
          "UPDATE user SET refresh_token = ? WHERE login_id = ?";
        connection.query(
          updateRefreshTokenQuery,
          [refreshToken, login_id],
          (err) => {
            if (err) {
              console.error("Error updating refresh token:", err);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }

            // 발급받은 토큰을 응답에 담아 클라이언트로 전송
            res.locals.data = {
              message: "성공적으로 로그인이 완료되었습니다!",
              accessToken,
              refreshToken,
            };
            next();
          }
        );
      } else {
        // 디비와 일치하는 사용자 정보가 없는 경우
        res
          .status(401)
          .json({ error: "유효하지 않은 아이디 또는 비밀번호 입니다." });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 로그아웃 API
router.post("/logout", (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "로그아웃"
  // #swagger.description = '현재 로그인된 사용자의 로그아웃을 수행'
  /*  #swagger.responses[500] = {
            description: '로그아웃 정보 불러오기 실패',
            schema: { message: '로그아웃 정보 불러오기 실패', error: '로그아웃 정보 불러오기 실패'}
    } */

  res.locals.data = { message: "로그아웃 되었습니다." };
  next();
});

router.post("/refresh-token", async (req, res, next) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = "리프레시 토큰을 사용하여 새로운 엑세스 토큰과 리프레시 토큰 발급"
    #swagger.description = '유효한 리프레시 토큰을 제공받아 새로운 엑세스 토큰과 리프레시 토큰을 발급합니다.'
    #swagger.parameters['refreshToken'] = {
        in: 'body',
        description: '리프레시 토큰',
        required: true,
        type: 'string',
        example: '리프래시 토큰 입력'
    } 
    #swagger.responses[401] = {
        description: '리프레시 토큰 누락 시의 응답',
        schema: { error: '리프레시 토큰이 필요합니다.' }
    }
    #swagger.responses[403] = {
        description: '유효하지 않은 리프레시 토큰의 응답',
        schema: { error: '유효하지 않은 리프레시 토큰입니다.' }
    }
    */
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) throw new Error("jwt 토큰: 리프레시 토큰이 필요합니다.");

    const connect = db.getConnection();

    const user = await new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        "your_secret_key_for_refresh_token",
        (err, user) => {
          if (err)
            reject(new Error("jwt 토큰: 유효하지 않은 리프레시 토큰입니다."));
          resolve(user);
        }
      );
    });

    console.log(user);

    await new Promise((resolve, reject) => {
      const query = "SELECT * FROM user WHERE id = ? AND refresh_token = ?";
      connect.query(query, [user.id, refreshToken], (dbErr, results) => {
        if (dbErr || results.length === 0)
          reject(new Error("리프레시 토큰이 일치하지 않습니다."));
        resolve();
      });
    });

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      "your_secret_key_for_access_token",
      { expiresIn: "1h" }
    );
    const newRefreshToken = jwt.sign(
      { id: user.id, username: user.username },
      "your_secret_key_for_refresh_token",
      { expiresIn: "7d" }
    );

    await new Promise((resolve, reject) => {
      const updateQuery = "UPDATE user SET refresh_token = ? WHERE id = ?";
      connect.query(updateQuery, [newRefreshToken, user.id], (updateErr) => {
        if (updateErr) reject(new Error("리프레시 토큰 업데이트 실패"));
        resolve();
      });
    });

    res.locals.data = {
      accessToken: accessToken,
      refreshToken: newRefreshToken,
      message: "새 엑세스 토큰과 리프레시 토큰이 발급되었습니다.",
    };
    return next();
  } catch (err) {
    console.error(err);
    res.locals.status = 403;
    res.locals.data = { error: err.message };
    return next();
  }
});

router.get(
  "/list",
  (req, res, next) => {
    /*
   #swagger.tags = ['Users']
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
  verifyToken,
  async (req, res, next) => {
    /*
   #swagger.tags = ['Users']
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
  verifyToken,
  async (req, res, next) => {
    /*
   #swagger.tags = ['Users']
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

module.exports = router;
