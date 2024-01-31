const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const db = require("../mysql/database.js");
const s3 = require("../aws/awsS3.js");
const router = express.Router();

const cardsQuery = async (connection, res, poll_id, next) => {
  try {
    const query =
      "SELECT image_url, explanation, eng_name FROM card WHERE poll_id = ?";
    const data = await new Promise((resolve, rejects) => {
      connection.query(query, [poll_id], (error, cardData) => {
        if (error) {
          console.error(error);
          res.locals.status = 500;
          res.locals.data = { message: "DB 쿼리 오류", error: error.message };
          rejects(new Error("DB 오류: card에서 데이터 조회 중 오류 발생"));
        }
        resolve(cardData);
      });
    });

    return data.length > 0 ? data : "데이터가 없음";
  } catch (error) {
    console.error(error);
    res.locals.data = { message: error.message };
    res.locals.status = 500;
    return next();
  }
};

module.exports = cardsQuery;
