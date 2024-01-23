const db = require("../mysql/database.js");

class MysqlLuckListRepository {
    constructor() {
        this.connection = db.getConnection();
        return this;
    }

    async findLuckListByOpt(opt) {
        try {
            const result = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM luck_list WHERE opt = ?`;
                this.connection.query(query, opt, (err, result) => {
                    if (err)
                        reject(new Error(err.message));
                    else
                        resolve(result);
                })
            });
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = MysqlLuckListRepository;