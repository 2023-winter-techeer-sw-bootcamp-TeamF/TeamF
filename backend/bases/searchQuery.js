const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const jwt = require("jsonwebtoken");
const db = require("../mysql/database.js");
const { resolve } = require("path");
const { rejects } = require("assert");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");

const searchQuery = async (connection, req, res, poll_id, next) => {
  try {
    const connection = db.getConnection();
    const searchQuery =
      "SELECT user_id, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_date FROM poll WHERE id = ?";
    const result = await new Promise((resolve, reject) => {
      connection.query(searchQuery, [poll_id], (error, searchData) => {
        if (error) {
          console.error("DB 쿼리 오류:", error);
          res.locals.status = 500;
          res.locals.data = { message: "DB 쿼리 오류", error: error.message };
          reject(new Error("DB 오류: poll에서 user_id 조회 중 오류 발생"));
        }
        resolve(searchData);
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
  } catch (error) {
    console.error(error);
    throw error; // 모듈에서 에러를 던져서 라우터에서 처리할 수 있도록 합니다.
  }
};

module.exports = searchQuery;
