const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 아래는 회원가입, 로그인, 로그아웃 API 구현해봄

// 회원가입 API
router.post('/signup', async (req, res, next) => {
    // 회원가입 정보를 받아옴
    const { id, password, username } = req.body;
  
    try {
      // ID 중복 검사
      const checkIdQuery = 'SELECT id FROM users WHERE id = ?';
      db.query(checkIdQuery, [id], (checkIdErr, checkIdResult) => {
        if (checkIdErr) {
          console.error('Error checking duplicate ID:', checkIdErr);
          res.locals.data = { message: '가입 중 오류가 발생했습니다.' };
          res.locals.statusCode = 500;
          next();
          return;
        }
  
        if (checkIdResult.length > 0) {
          // 이미 존재하는 ID인 경우
          res.locals.data = { message: '이미 사용 중인 ID입니다.' };
          res.locals.statusCode = 400; // Bad Request
          next();
          return;
        }

          // 회원가입시 토큰 생성
          const token = jwt.sign({ id, username }, '시크릿키???', { expiresIn: '1h' });
  
        // ID가 존재하지 않으면 계속 진행


        // 비밀번호 해싱하는 작업 (가입때만 하면 되나?)
        const hashedPassword = hashPassword(password);
  
        // MySQL 쿼리 실행
        const insertQuery = 'INSERT INTO users (id, password, username) VALUES (?, ?, ?)';
        db.query(insertQuery, [id, hashedPassword, username], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error executing MySQL query:', insertErr);
            res.locals.data = { message: '가입 중 오류가 발생했습니다.' };
            res.locals.statusCode = 500; // 인터넷 서버 에러
            next();
            return;
          }
  
        
  
          // 회원가입 성공 응답
          res.locals.data = { message: '가입에 성공 하였습니다.', token };
          next();
        });
      });
    } catch (error) {
      console.error('Error during signup:', error);
      res.locals.data = { message: '가입에 실패 하였습니다.' };
      res.locals.statusCode = 500;
      next();
    }
  });
  
  
  
// 로그인 API
router.post('/login', async (req, res, next) => {
    // 로그인 정보를 받아옴
    const { id, password } = req.body;
  
    try {
      // 사용자 인증 과정 수행
      
      // 로그인 성공 응답
      res.locals.data = { message: '로그인에 성공 하였습니다', token };
      next();
    } catch (error) {
      console.error('Error during login:', error);
      res.locals.data = { message: '로그인에 실패 하였습니다.' };
      res.locals.statusCode = 500; // 
      next();
    }
  });
  
  // 로그아웃 API
  router.post('/logout', (req, res, next) => {
    // 로그아웃 로직
  
    res.locals.data = { message: '로그아웃 되었습니다.' };
    next();
  });
router.get('/', (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.summary = "TODO : 로그인, 회원가입, 로그아웃"
    // #swagger.description = '/login /signup /logout'

    res.locals.data = { message: 'Page : user.js' };
    next();
});

module.exports = router;