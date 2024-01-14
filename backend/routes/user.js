const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const jwt = require("jsonwebtoken");
const db = require("../mysql/database.js");
const router = express.Router();

// 회원가입, 로그인, 로그아웃, 그리고 로그인시 액세스와 리프레시 토큰(jwt)을 발급하는 기능 등의  API를 다음과 같이 구현했다.

// 회원가입 API
router.post("/signup", async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.summary = "회원가입"
  // #swagger.description = '회원가입 하는 유저의 아이디 중복검사 및 가입 하는 유저의 정보를 데이터베이스에 저장'
  /*  #swagger.responses[400] = {
            description: '접근 방식 오류',
            schema: { message: '모두 입력해주세요!', error:'접근 방식 오류'}
        } */
  /*  #swagger.responses[409] = {
            description: '이미 존재하는 아이디',
            schema: { message: '이미 존재하는 아이디 입니다.', error:'중복 에러'}
        } */
  /*  #swagger.responses[500] = {
            description: '회원가입 정보 불러오기 실패',
            schema: { message: '회원가입 정보 불러오기 실패', error: '회원가입 정보 불러오기 실패'}
    } */
  /* #swagger.parameters['login_id'] = { 
        in: 'query',
        description: '사용자의 아이디', 
        required: true,
        type: 'string',
        example: 'minki',
    } */
  /* #swagger.parameters['password'] = {
        in: 'query',
        description: '비밀번호',
        required: true,
        type: 'string',
        example: '0000'
    } */
  /* #swagger.parameters['name'] = {
        in: 'query',
        description: '닉네임',
        required: true,
        type: 'string',
        example: '타로마스터'
    }*/

  try {
    const { login_id, password, name } = req.query;

    // 유효한 정보인지 검사하는 기능
    if (!login_id || !password || !name) {
      res
        .status(400)
        .json({
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
        res
          .status(409)
          .json({
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
  // #swagger.tags = ['User']
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
  // #swagger.tags = ['User']
  // #swagger.summary = "로그아웃"
  // #swagger.description = '현재 로그인된 사용자의 로그아웃을 수행'
  /*  #swagger.responses[500] = {
            description: '로그아웃 정보 불러오기 실패',
            schema: { message: '로그아웃 정보 불러오기 실패', error: '로그아웃 정보 불러오기 실패'}
    } */

  res.locals.data = { message: "로그아웃 되었습니다." };
  next();
});

module.exports = router;
