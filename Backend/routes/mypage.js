const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const router = express.Router();
const jwt = require('jsonwebtoken')

// '/detail' 라우트
router.get('/detail', (req, res, next) => {
    // #swagger.tags = ['MyPage']
    // #swagger.security = [{ "Bearer": [] }]
    // #swagger.summary = "결과 리스트에서 선택한 결과(poll_id) 상세 조회"
    // #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)를 통해 해당 결과를 상세조회한다.'
    /* #swagger.parameters['poll_id'] = {
        in: 'query',
        description: '폴 아이디 입력',
        required: true,
        example: 'number',
        value: '',
    } */
    const { poll_id } = req.query;
    const connection = db.getConnection();

    const searchQuery = 'SELECT user_id FROM poll WHERE id = ?';
    connection.query(searchQuery, [poll_id], (error, result) => {
        if (error) {
            console.error('DB 쿼리 오류:', error);
            res.locals.error = 'DB 쿼리 오류';
            res.locals.errorStatus = 500;
            return next();
        }

        if (result.length === 0) {
            res.locals.error = '해당 ID를 가진 폴이 존재하지 않습니다.';
            res.locals.errorStatus = 404;
            return next();
        }

        if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id, 10)) {
            res.locals.error = 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.';
            res.locals.errorStatus = 403;
            return next();
        }

        const resultQuery = 'SELECT question, explanation, luck, master_name FROM result WHERE poll_id = ?';
        connection.query(resultQuery, [poll_id], (error, resultData) => {
            if (error) {
                res.locals.error = 'DB 쿼리 오류';
                res.locals.errorStatus = 500;
                return next();
            }

            const cardsQuery = 'SELECT image_url, explanation FROM card WHERE poll_id = ?';
            connection.query(cardsQuery, [poll_id], (error, cardData) => {
                if (error) {
                    /* #swagger.responses[500] = {
                        description: '내부 서버 오류로 인한 DB 쿼리 실패.',
                        schema: { message: 'DB 쿼리 오류' }
                    } */
                    res.locals.error = 'DB 쿼리 오류';
                    res.locals.errorStatus = 500;
                    return next();
                }
                /* #swagger.responses[200] = {
                    description: '총합 결과와 카드별 해석 및 링크 데이터 성공적으로 조회됨.',
                    schema: {
                        result: [{ question: '테스트 질문', explanation: '테스트 종합 해석', luck: '테스트 럭 리스트', master_name: '테스트 마스터', created_at: '2024-01-11' }],
                        card: [{ image_url: '테스트url', explanation: '카드해석' }]
                    }
                } */
                res.locals.data = {
                    result: resultData.length > 0 ? resultData : '데이터가 없음',
                    card: cardData.length > 0 ? cardData : '데이터가 없음'
                };
                next();
            });
        });
    });
}, commonResponse);

// 결과 삭제 API
// '/delete' 라우트
router.delete('/delete', (req, res, next) => {
    // #swagger.tags = ['MyPage']
    // #swagger.security = [{ "Bearer": [] }]
    // #swagger.summary = "결과 리스트에서 선택한 결과 및 카드 삭제"
    // #swagger.description = '결과 리스트 중 선택한 결과(Poll_id) 및 해당 결과에 대한 카드를 삭제한다.'
    const { poll_id } = req.query;
    const connection = db.getConnection();

    const searchQuery = 'SELECT user_id FROM poll WHERE id = ?';
    connection.query(searchQuery, [poll_id], (error, result) => {
        if (error) {
            console.error('DB쿼리 오류: ', error);
            res.locals.error = 'DB 쿼리 오류';
            res.locals.errorStatus = 500;
            return next();
        }

        if (result.length === 0) {
            res.locals.error = '해당 ID를 가진 폴이 존재하지 않습니다.';
            res.locals.errorStatus = 404;
            return next();
        }

        if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id, 10)) {
            res.locals.error = '토큰과 폴 아이디가 일치하지 않습니다';
            res.locals.errorStatus = 403;
            return next();
        }

        const deleteResultQuery = 'DELETE FROM poll WHERE id = ?';
        connection.query(deleteResultQuery, [poll_id], (error) => {
            if (error) {
                console.error('DB 쿼리 오류:', error);
                res.locals.error = 'DB 쿼리 오류';
                res.locals.errorStatus = 500;
                return next();
            }

            const deleteCardsQuery = 'DELETE FROM card WHERE poll_id = ?';
            connection.query(deleteCardsQuery, [poll_id], (error) => {
                if (error) {
                    console.error('DB 쿼리 오류:', error);
                    res.locals.error = 'DB 쿼리 오류';
                    res.locals.errorStatus = 500;
                    return next();
                }

                res.locals.data = { message: '삭제 성공' };
                next();
            });
        });
    });
}, commonResponse);

module.exports = router;