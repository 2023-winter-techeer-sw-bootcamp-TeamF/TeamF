const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const jwt = require('jsonwebtoken');
const db = require('../mysql/database.js');
const router = express.Router();

// 회원가입, 로그인, 로그아웃, 그리고 로그인시 액세스와 리프레시 토큰(jwt)을 발급하는 기능 등의  API를 다음과 같이 구현했다.

// 회원가입 API
router.post('/signup', async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "회원가입"
    // #swagger.description = '회원가입 하는 유저의 아이디, username 중복검사 및 가입 하는 유저의 정보를 데이터베이스에 저장'
    /*  #swagger.responses[400] = {
            description: '접근 방식 오류',
            schema: {
                message: '접근 방식 오류'
            }
        } */
    /*  #swagger.responses[409] = {
            description: '이미 존재하는 아이디나 username 입니다.',
            schema: {
                message: '이미 존재하는 아이디나 username 입니다.'
            }
        } */
    /*  #swagger.responses[500] = {
            description: '회원가입 정보 불러오기 실패',
            schema: {
                message: '회원가입 정보 불러오기 실패'
            }
    } */
    /* #swagger.parameters['id'] = { 
        in: 'query',
        description: '사용자의 아이디', 
        required: true,
        type: 'string',
        example: 'minki',
    } */
    /* #swagger.parameters['password'] = {
        in: 'query',
        description: '비밀번호',
        required: true,
        type: 'string',
        example: '0000'
    } */
    /* #swagger.parameters['username'] = {
        in: 'query',
        description: '닉네임',
        required: true,
        type: 'string',
        example: '타로마스터'
    }*/

    try {
        const { id, password, username } = req.query;

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
router.post('/login', (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = '로그인 API'
    // #swagger.description = '사용자의 아이디와 비밀번호를 받아 로그인을 수행하고, 성공 시 액세스 토큰과 리프레시 토큰을 반환합니다.'
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: '로그인 정보',
        required: true,
            id : 'test',
            password : '123'
        }
    } */
    /* #swagger.responses[200] = { 
           description: '로그인 성공',
           schema: {
               status: "success",
               statusCode: 200,
               data: {
                   message: "성공적으로 로그인이 완료되었습니다!",
                   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJ1c2VybmFtZSI6InRlc3ROYW1lIiwiaWF0IjoxNzA0OTYyMTIyLCJleHAiOjE3MDQ5NjU3MjJ9.ziYSVP8XfBiwV6bAuMizpUclMJQw6sK3AceNXiGR-0I",
                   refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJ1c2VybmFtZSI6InRlc3ROYW1lIiwiaWF0IjoxNzA0OTYyMTIyLCJleHAiOjE3MDUyMjEzMjJ9._hVLt5hY1kywTaFSm0FL0G9nsHXVYK_PcDo8YqAq8hI"
               }
           }
    } */
    /* #swagger.responses[401] = { 
           description: '유효하지 않은 아이디 또는 비밀번호'
    } */
    /* #swagger.responses[500] = { 
           description: '서버 내부 오류'
    } */

    const { id, password } = req.body;
    const connection = db.getConnection();
    const query = 'SELECT * FROM users WHERE id = ? AND password = ?';

    connection.query(query, [id, password], (err, results) => {
        if (err) {
            console.error('로그인 중 데이터베이스 조회 에러:', err);
            res.locals = { success: false, status: 500, data: { error: '서버 내부 오류' } };
            return next();
        }

        if (results.length > 0) {
            const user = results[0];

            // 토큰 생성
            const accessToken = jwt.sign({ id, username: user.username }, 'your_secret_key_for_access_token', { expiresIn: '1h' });
            const refreshToken = jwt.sign({ id, username: user.username }, 'your_secret_key_for_refresh_token', { expiresIn: '3d' });

            // 리프레시 토큰 저장
            const updateRefreshTokenQuery = 'UPDATE users SET refresh_token = ? WHERE id = ?';
            connection.query(updateRefreshTokenQuery, [refreshToken, id], (err) => {
                if (err) {
                    console.error('리프레시 토큰 업데이트 에러:', err);
                    res.locals = { success: false, status: 500, data: { error: '리프레시 토큰 업데이트 중 오류가 발생했습니다.' } };
                    return next();
                }

                res.locals = { status: 200, data: { message: '성공적으로 로그인이 완료되었습니다!', accessToken, refreshToken } };
                next();
            });
        } else {
            res.locals = { success: false, status: 401, data: { error: '유효하지 않은 아이디 또는 비밀번호 입니다.' } };
            next();
        }
    });
}, commonResponse);

// 로그아웃 API
router.post('/logout', (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "로그아웃"
    // #swagger.description = '현재 로그인된 사용자의 로그아웃을 수행'
    /*  #swagger.responses[500] = {
            description: '로그아웃 정보 불러오기 실패',
    } */

    res.locals.data = { message: '로그아웃 되었습니다.' };
    next();
});

module.exports = router;
