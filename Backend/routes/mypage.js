const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['MyPage']
    // #swagger.summary = "TODO: 총합 결과 저장"
    // #swagger.description = '/result /result/save'
    res.locals.data = { message: 'Page : mypage.js' };
    next();
});

router.get('/detail', (req, res) => {
    // #swagger.tags = ['MyPage']
    // #swagger.summary = "결과 리스트에서 선택한 결과 상세 조회"
    // #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)를 통해 해당 결과를 상세조회한다.'
    
    
    const { poll_id } = req.query;
    const connection = db.getConnection();

    // 'results' 테이블에서 poll_id와 user_id를 사용하여 데이터 조회
    const resultQuery = 'SELECT question, explanation, luck, master_name, created_at FROM results WHERE poll_id = ?';
    connection.query(resultQuery, [poll_id], (error, resultData) => {
        if (error) {
            console.error('DB 쿼리 오류:', error);
            /* #swagger.responses[500] = {
                description: '내부 서버 오류로 인한 DB 쿼리 실패.',
                schema: { message: 'DB 쿼리 오류' }
            } */
            return res.status(500).send({ message: 'DB 쿼리 오류' });
        }

        // 'cards' 테이블에서 poll_id를 사용하여 데이터 조회
        const cardsQuery = 'SELECT image_url, explanation FROM cards WHERE poll_id = ?';
        connection.query(cardsQuery, [poll_id], (error, cardsData) => {
            if (error) {
                console.error('DB 쿼리 오류:', error);
                /* #swagger.responses[500] = {
                    description: '내부 서버 오류로 인한 DB 쿼리 실패.',
                    schema: { message: 'DB 쿼리 오류' }
                } */
                return res.status(500).send({ message: 'DB 쿼리 오류' });
            }
            /* #swagger.responses[200] = {
                description: '결과와 카드 데이터 성공적으로 조회됨.',
                schema: {
                    result: [{ question: '', explanation: '', luck: '', master_name: '', created_at: '' }],
                    cards: [{ image_url: '', explanation: '' }]
                }
            } */
            res.json({
                result: resultData,
                cards: cardsData
            });
        });
    });
});


module.exports = router;