const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../mysql/database.js');
const { connect } = require('http2');
const router = express.Router();

router.post('/refresh', async (req, res, next) => {
    /*
    #swagger.tags = ['Token']
    #swagger.summary = "리프레시 토큰을 사용하여 새로운 엑세스 토큰과 리프레시 토큰 발급"
    #swagger.description = '유효한 리프레시 토큰을 제공받아 새로운 엑세스 토큰과 리프레시 토큰을 발급합니다.'
    #swagger.parameters['refreshToken'] = {
        in: 'body',
        description: '리프레시 토큰',
        required: true,
        type: 'string',
        example: '리프래시 토큰 입력'
    } 
    #swagger.responses[401] = {
        description: '리프레시 토큰 누락 시의 응답',
        schema: { error: '리프레시 토큰이 필요합니다.' }
    }
    #swagger.responses[403] = {
        description: '유효하지 않은 리프레시 토큰의 응답',
        schema: { error: '유효하지 않은 리프레시 토큰입니다.' }
    */
    const { refreshToken } = req.body;

    try {

        if (!refreshToken)
            throw new Error('jwt 토큰: 리프레시 토큰이 필요합니다.');

        const connect = db.getConnection();

        new Promise((reject) => {

            jwt.verify(refreshToken, 'your_secret_key_for_refresh_token', (err, user) => {
                if (err)
                    reject(new Error('jwt 토큰: 유효하지 않은 리프레시 토큰입니다.'));
            });

            const query = 'SELECT * FROM users WHERE id = ? AND refresh_token = ?';
            connect.query(query, [user.id, refreshToken], (dbErr, results) => {
                if (dbErr || results.length === 0)
                    reject(new Error('리프레시 토큰이 일치하지 않습니다.'));
            });

            const accessToken = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key_for_access_token', { expiresIn: '1h' });
            const newRefreshToken = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key_for_refresh_token', { expiresIn: '7d' });

            const updateQuery = 'UPDATE users SET refresh_token = ? WHERE id = ?';
            connect.query(updateQuery, [newRefreshToken, user.id], (updateErr) => {
                if (updateErr)
                    reject(new Error('리프레시 토큰 업데이트 실패'));
            });

            res.locals.data = { accessToken: accessToken, refreshToken: newRefreshToken, message: '새 엑세스 토큰과 리프레시 토큰이 발급되었습니다.' };
            return next();
        });

    } catch (err) {
        console.error(err);
        res.locals.status = 403;
        res.locals.data = { error: err.message };
    }
});

module.exports = router;
