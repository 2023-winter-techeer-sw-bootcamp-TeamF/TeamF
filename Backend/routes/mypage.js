const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();

router.get('/detail', (req, res) => {
    // #swagger.tags = ['MyPage']
    // #swagger.summary = "결과 리스트에서 선택한 결과 상세 조회"
    // #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)를 통해 해당 결과를 상세조회한다.'
        /* #swagger.parameters['poll_id'] = { 
        in: 'query',
        description: '사용자의 poll_id', 
        required: true,
        example: '12',
    } */   
    
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
                description: '총합 결과와 카드별 해석 및 링크 데이터 성공적으로 조회됨.',
                schema: {
                    result: [{ question: '테스트 질문', explanation: '테스트 종합 해석', luck: '테스트 럭 리스트', master_name: '테스트 마스터', created_at: '2024-01-11' }],
                    cards: [{ image_url: '테스트url', explanation: '카드해석' }]
                }
            } */
            res.json({
                result: resultData,
                cards: cardsData
            });
        });
    });
});

// 결과삭제 API (사용자 고유번호 및 카드정보 삭제)

router.delete('/delete', (req, res) => {
    // #swagger.tags = ['MyPage']
    // #swagger.summary = "결과 리스트에서 선택한 결과 및 카드 삭제"
    // #swagger.description = '결과 리스트 중 선택한 결과(Poll_id) 및 해당 결과에 대한 카드를 삭제한다.'

    const { poll_id, user_id } = req.query;
    const connection = db.getConnection();

    // 'results' 테이블에서 poll_id와 user_id를 사용하여 데이터 삭제
    const deleteResultQuery = 'DELETE FROM results WHERE poll_id = ? AND user_id = ?';
    connection.query(deleteResultQuery, [poll_id, user_id], (error) => {
        if (error) {
            console.error('DB 쿼리 오류:', error);
            /* #swagger.responses[500] = {
                description: '내부 서버 오류로 인한 DB 쿼리 실패.',
                schema: { message: 'DB 쿼리 오류' }
            } */
            return res.status(500).send({ message: 'DB 쿼리 오류' });
        }

        // 'cards' 테이블에서 poll_id를 사용하여 데이터 삭제
        const deleteCardsQuery = 'DELETE FROM cards WHERE poll_id = ?';
        connection.query(deleteCardsQuery, [poll_id], (error) => {
            if (error) {
                console.error('DB 쿼리 오류:', error);
                /* #swagger.responses[500] = {
                    description: '내부 서버 오류로 인한 DB 쿼리 실패.',
                    schema: { message: 'DB 쿼리 오류' }
                } */
                return res.status(500).send({ message: 'DB 쿼리 오류' });
            }

            /* #swagger.responses[200] = {
                description: '결과 및 카드 데이터 성공적으로 삭제됨.',
                schema: { message: '삭제 성공' }
            } */
            res.json({ message: '삭제 성공' });
        });
    });
});



module.exports = router;