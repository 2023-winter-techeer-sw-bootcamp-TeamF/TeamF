// mysqlDB에 prompt를 내용을 저장하는 미들웨어
const savePrompt = (req, res, next) => {
    // 데이터가 없으면 다음 미들웨어로 넘김
    if (!res.locals.data) return next();

    const { cards, ask, answer } = req.query;
    
    try {
        // mysqlDB에 prompt를 내용을 저장하는 코드
    const sql = `INSERT INTO prompt (cards, ask, answer) VALUES ('${cards}', '${ask}', '${answer}')`;
    mysqlDB.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    }

    } catch (error) {
        console.log(error);
    }
    
}