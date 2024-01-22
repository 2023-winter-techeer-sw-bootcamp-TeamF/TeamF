const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const db = require("../mysql/database.js");
const s3 = require("../aws/awsS3.js");
const router = express.Router();

const resultQuery = async (connection, res, poll_id, next) => {
  try {
    const connection = db.getConnection();
    const query =
      "SELECT question, explanation, luck, master_name FROM result WHERE poll_id = ?";
    const data = await new Promise((resolve, rejects) => {
      connection.query(query, [poll_id], (error, resultData) => {
        if (error) {
          console.error(error);
          rejects(new Error("DB 오류: result에서 데이터 조회 중 오류 발생"));
        }
        resolve(resultData);
      });
    });

    return data.length > 0 ? data : "데이터가 없음";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = resultQuery;
