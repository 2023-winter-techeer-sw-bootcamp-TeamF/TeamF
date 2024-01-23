const express = require("express");
const db = require("../mysql/database.js");
const { resolve } = require("path");
const { rejects } = require("assert");

const dateQuery = async (connection, req, res, poll_id, next) => {
  try {
    if (!poll_id) {
      throw new Error("유효하지 않은 poll_id");
    }

    // 연결이 유효한지 확인
    if (!connection) {
      throw new Error("데이터베이스 연결 실패");
    }
    const dateQuery =
      "SELECT user_id, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_date FROM poll WHERE id = ?";

    const result = await new Promise((resolve, reject) => {
      connection.query(dateQuery, [poll_id], (error, dateData) => {
        if (error) {
          console.error("DB 쿼리 오류:", error);
          res.locals.status = 500;
          res.locals.data = { message: "DB 쿼리 오류", error: error.message };
          reject(new Error("DB 오류: poll에서 user_id 조회 중 오류 발생"));
        } else {
          console.log("dateQuery.js dateData = " + JSON.stringify(dateData));
          console.log("dateQuery.js dateData = " + dateData[0].created_date);
          resolve(dateData);
        }
      });
    });

    console.log("dateQuery.js dateData = " + result);

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

    return result;
    
  } catch (error) {
    console.error(error);
    throw error; // 모듈에서 에러를 던져서 라우터에서 처리할 수 있도록 합니다.
  }
};

module.exports = dateQuery;
