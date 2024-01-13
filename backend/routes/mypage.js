const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken')

router.get('/detail', verifyToken, (req, res, next) => {
    // #swagger.tags = ['MyPage']
    // #swagger.security = [{ "Bearer": [] }]
    // #swagger.summary = "결과 리스트에서 선택한 결과 상세 조회"
    // #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)를 통해 해당 결과를 상세조회한다.'
    /* #swagger.parameters['poll_id'] = {
        in: 'query',
        description: 'poll_id',
        required: true,
        example: '12',
        value : '12',
    } */
    const { poll_id } = req.query;

    const connection = db.getConnection();

    const searchQuery = 'SELECT user_id FROM poll WHERE id = ?';
    connection.query(searchQuery, [poll_id], (error, result) => {

        console.log("user id1 " + req.user.id)
         console.log("user id2 " + result[0].id)
        // console.log("user id2 " + req.id)
        // console.log("user id3 " + req.user.id)
        // console.log("user id4 " + result[0].user_id)

        if (error) {
            console.error('DB 쿼리 오류1:', error);
            return res.status(500).send({ message: 'DB 쿼리 오류', error });
        }

        if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id,10)) {
            return res.status(403).json({ error: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.' });
        }


        // 'results' 테이블에서 poll_id와 user_id를 사용하여 데이터 조회
        const resultQuery = 'SELECT question, explanation, luck, master_name FROM result WHERE poll_id = ?';
        connection.query(resultQuery, [poll_id], (error, resultData) => {
            if (error) {
                console.error('DB 쿼리 오류:', error);
                /* #swagger.responses[500] = {
                    description: '내부 서버 오류로 인한 DB 쿼리 실패.',
                    schema: { message: 'DB 쿼리 오류' }
                } */
                return res.status(500).send({ message: 'DB3 쿼리 오류' });
            }

            // 'card' 테이블에서 poll_id를 사용하여 데이터 조회
            const cardsQuery = 'SELECT image_url, explanation FROM card WHERE poll_id = ?';
            connection.query(cardsQuery, [poll_id], (error, cardData) => {
                if (error) {
                    console.error('DB 쿼리 오류:', error);
                    /* #swagger.responses[500] = {
                        description: '내부 서버 오류로 인한 DB 쿼리 실패.',
                        schema: { message: 'DB 쿼리 오류' }
                    } */
                    return res.status(500).send({ message: 'DB4 쿼리 오류' });
                }
                /* #swagger.responses[200] = {
                    description: '총합 결과와 카드별 해석 및 링크 데이터 성공적으로 조회됨.',
                    schema: {
                        result: [{ question: '테스트 질문', explanation: '테스트 종합 해석', luck: '테스트 럭 리스트', master_name: '테스트 마스터', created_at: '2024-01-11' }],
                        card: [{ image_url: '테스트url', explanation: '카드해석' }]
                    }
                } */
                res.json({
                    result: resultData,
                    card: cardData
                });
            });
        });
    });
});

// 결과 삭제 API
router.delete('/delete', verifyToken, (req, res, next) => {
    // #swagger.tags = ['MyPage']
    // #swagger.security = [{ "Bearer": [] }]
    // #swagger.summary = "결과 리스트에서 선택한 결과 및 카드 삭제"
    // #swagger.description = '결과 리스트 중 선택한 결과(Poll_id) 및 해당 결과에 대한 카드를 삭제한다.'

    const { poll_id } = req.query;
    const connection = db.getConnection();

    // 확인: 디코딩된 토큰의 id와 폴 아이디가 일치하는지 확인
    // 토큰 추출 값과 poll 테이블의 사용자 id가 일치하는지 확인
    const searchQuery = 'SELECT user_id FROM poll WHERE id = ?';
    connection.query(searchQuery, [poll_id], (error, result) => {

        if (error) {
            console.error('DB 쿼리 오류:', error);
            return res.status(500).send({ message: 'DB 쿼리 오류', error });
        }

        if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id,10)) {
            return res.status(403).json({ error: '토큰과 폴 아이디가 일치하지 않습니다' });
        }

        // 'poll' 테이블에서 id를 사용하여 데이터 삭제
        const deleteResultQuery = 'DELETE FROM poll WHERE id = ?';
        connection.query(deleteResultQuery, [poll_id], (error) => {

            if (error) {
                console.error('DB 쿼리 오류:', error);
                return res.status(500).send({ message: 'DB 쿼리 오류' });
            }

            // 'card' 테이블에서 poll_id를 사용하여 데이터 삭제
            const deleteCardsQuery = 'DELETE FROM card WHERE poll_id = ?';
            connection.query(deleteCardsQuery, [poll_id], (error) => {
                if (error) {
                    console.error('DB 쿼리 오류:', error);
                    return res.status(500).send({ message: 'DB 쿼리 오류' });
                }

                res.json({ message: '삭제 성공' });
            });
        });

        res.locals.data = { message: '데이터 삭제 완료' }
        next();
    });
});

module.exports = router;
