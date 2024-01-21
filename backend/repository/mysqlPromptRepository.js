const e = require("express");
const db = require("../mysql/database.js");
const util = require("util");

class MysqlPromptRepository {
  constructor() {
    this.connection = db.getConnection();
    return this;
  }

  async findSystemByLuckId(luckId) {
    try {

      const result = await new Promise((resolve, reject) => {
        const query = `SELECT system_prompt FROM prompt WHERE id = ?`;
        this.connection.query(query, luckId, (err, result) => {
          if (err)
            reject(new Error(err.message));
          else
            resolve(result);
        })
      });

      console.log('findSystemByLuckId : ', result[0].system_prompt);
      return result[0].system_prompt;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findUserByLuckId(luckId) {
    try {
      const result = await new Promise((resolve, reject) => {
        const query = `SELECT user_prompt FROM prompt WHERE id = ?`;
        this.connection.query(query, luckId, (err, result) => {
          if (err)
            reject(new Error(err.message));
          else
            resolve(result);
        })
      });
      console.log('findUserByLuckId : ', result[0].user_prompt);
      return result[0].user_prompt;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}

module.exports = MysqlPromptRepository;