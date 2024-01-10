const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const jwt = require('jsonwebtoken');
const db = require('../mysql/database.js');
const router = express.Router();

// 회원가입, 로그인, 로그아웃, 그리고 로그인시 액세스와 리프레시 토큰(jwt)을 발급하는 기능 등의  API를 다음과 같이 구현했다.

// 회원가입 API
router.post('/signup', async (req, res, next) => {
    try {
        const { id, password, username } = req.body;

        // 유효한 정보인지 검사하는 기능
        if (!id || !password || !username) {
            res.status(400).json({ error: '유효하지 않은 접근입니다. 아이디, 비밀번호, username을 입력해주세요.' });
            return;
        }

        // username과 아이디 중복 체크
        const connection = db.getConnection();
        const checkQuery = 'SELECT * FROM users WHERE username = ? OR id = ?';
        connection.query(checkQuery, [username, id], (checkError, checkResults) => {
            if (checkError) {
                console.error('Error during signup check:', checkError);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (checkResults.length > 0) {
                // 이미 존재하는 username 또는 아이디인 경우
                res.status(409).json({ error: '이미 존재하는 아이디 또는 username 입니다. 다시 입력해주세요.' });
            } else {
                // 존재하지 않는 경우, 사용자 정보를 데이터베이스에 저장
                const insertQuery = 'INSERT INTO users (id, password, username) VALUES (?, ?, ?)';
                connection.query(insertQuery, [id, password, username], (insertError, insertResults) => {
                    if (insertError) {
                        console.error('Error during signup:', insertError);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.locals.data = { message: '회원가입이 성공적으로 완료 되었습니다!' };
                        next();
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 로그인 API
router.post('/login', async (req, res, next) => {
    try {
        const { id, password } = req.body;

        // 디비로부터 사용자 정보 조회
        const connection = db.getConnection();
        const query = 'SELECT * FROM users WHERE id = ? AND password = ?';
        connection.query(query, [id, password], (error, results) => {
            if (error) {
                console.error('Error during login:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (results.length > 0) {
                // 디비와 일치하는 사용자 정보가 있는 경우 다음과 같이 진행됨.

                // 로그인 성공 시, 액세스 토큰과 리프레시 토큰 발급 및 응답
                const accessToken = jwt.sign({ id, username: results[0].username }, 'your_secret_key_for_access_token', { expiresIn: '1h' });
                const refreshToken = jwt.sign({ id, username: results[0].username }, 'your_secret_key_for_refresh_token', { expiresIn: '3d' });

                // 발급받은 토큰을 응답에 담아 클라이언트로 전송
                res.locals.data = { message: '성공적으로 로그인이 완료되었습니다!', accessToken, refreshToken };
                next();
            } else {
                // 디비와 일치하는 사용자 정보가 없는 경우 다음과 같이 진행됨.
                res.status(401).json({ error: '유효하지 않은 아이디 또는 비밀번호 입니다.' });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 로그아웃 API
router.post('/logout', (req, res, next) => {
    res.locals.data = { message: '로그아웃 되었습니다.' };
    next();
});

module.exports = router;