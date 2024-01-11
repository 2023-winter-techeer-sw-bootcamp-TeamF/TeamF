const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../mysql/database.js');
const router = express.Router();

router.post('/refresh', (req, res) => {
    // #swagger.tags = ['Token']
    // #swagger.summary = "리프레시 토큰을 사용하여 새로운 엑세스 토큰과 리프레시 토큰 발급"
    // #swagger.description = '유효한 리프레시 토큰을 제공받아 새로운 엑세스 토큰과 리프레시 토큰을 발급합니다.'
    /* #swagger.parameters['refreshToken'] = {
           in: 'body',
           description: '리프레시 토큰',
           required: true,
           type: 'string',
           example: '리프래시 토큰 입력'
    } */
    const { refreshToken } = req.body;
    if (!refreshToken) {
        /* #swagger.responses[401] = {
            description: '리프레시 토큰 누락 시의 응답',
            schema: { error: '리프레시 토큰이 필요합니다.' }
        } */
        return res.status(401).json({ error: '리프레시 토큰이 필요합니다.' });
    }

    jwt.verify(refreshToken, 'your_secret_key_for_refresh_token', (err, user) => {
        if (err) {
            /* #swagger.responses[403] = {
                description: '유효하지 않은 리프레시 토큰의 응답',
                schema: { error: '유효하지 않은 리프레시 토큰입니다.' }
            } */
            return res.status(403).json({ error: '유효하지 않은 리프레시 토큰입니다.' });
        }

        const query = 'SELECT * FROM users WHERE id = ? AND refresh_token = ?';
        db.getConnection().query(query, [user.id, refreshToken], (dbErr, results) => {
            if (dbErr || results.length === 0) {
                return res.status(403).json({ error: '유효하지 않은 리프레시 토큰입니다.' });
            }

            const accessToken = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key_for_access_token', { expiresIn: '1h' });
            const newRefreshToken = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key_for_refresh_token', { expiresIn: '7d' });

            const updateQuery = 'UPDATE users SET refresh_token = ? WHERE id = ?';
            db.getConnection().query(updateQuery, [newRefreshToken, user.id], (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ error: '리프레시 토큰 업데이트 중 오류가 발생했습니다.' });
                }

                res.json({
                    accessToken: accessToken,
                    refreshToken: newRefreshToken,
                    message: '새 엑세스 토큰과 리프레시 토큰이 발급되었습니다.'
                });
            });
        });
    });
});

module.exports = router;
