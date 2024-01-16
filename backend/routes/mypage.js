const express = require("express");
const commonResponse = require("../middleware/commonResponse.js");
const db = require("../mysql/database.js");
const { resolve } = require("path");
const router = express.Router();

// '/detail' 라우트
router.get('/detail', async (req, res, next) => {
  /*
   #swagger.tags = ['MyPage']
   #swagger.security = [{ "Bearer": [] }]
   #swagger.summary = "결과 리스트에서 선택한 결과(poll_id) 상세 조회"
   #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)를 통해 해당 결과를 상세조회한다.'
   #swagger.parameters['poll_id'] = {
      in: 'query',
      description: '폴 아이디 입력',
      required: true,
      example: 'Poll_ID',
      value: '',
  } 
   #swagger.responses[404] = {
      description: '해당 ID를 가진 폴이 존재하지 않습니다.',
      schema: { error: '해당 ID를 가진 폴이 존재하지 않습니다.' }
   } 
   #swagger.responses[403] = {
      description: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.',
      schema: { error: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.' }
    } 
   #swagger.responses[500] = {
      description: '내부 서버 오류로 인한 DB 쿼리 실패',
      schema: { 
        message: '내부 서버 오류로 인한 DB 쿼리 실패', 
        error: '내부 서버 오류로 인한 DB 쿼리 실패'
      }
    }
    #swagger.responses[200] = {
      description: '총합 결과와 카드별 해석 및 링크 데이터 성공적으로 조회됨.',
      schema: {
        result: 'result 결과 조회 성공',
        card: 'card 결과 조회 성공'
      }
    }
    */
  const { poll_id } = req.query;
  const connection = db.getConnection();

  try {

    const searchQuery = 'SELECT user_id FROM poll WHERE id = ?';
    await connection.query(searchQuery, [poll_id], (error, result) => {
      if (error) {
        console.error('DB 쿼리 오류:', error);
        res.locals.error = 'DB 쿼리 오류';
        res.locals.errorStatus = 500;
        throw new Error('DB 오류: poll에서 user_id 조회 중 오류 발생');
      }

      if (result.length === 0) {
        res.locals.error = '해당 ID를 가진 폴이 존재하지 않습니다.';
        res.locals.errorStatus = 404;
        throw new Error('DB 오류: 해당 ID를 가진 폴이 존재하지 않습니다.');
      }

      if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id, 10)) {
        res.locals.error = 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.';
        res.locals.errorStatus = 403;
        throw new Error('DB 오류: JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.');
      }
    });

    const resultQuery = 'SELECT question, explanation, luck, master_name FROM result WHERE poll_id = ?';
    await connection.query(resultQuery, [poll_id], (error, resultData) => {
      if (error) {
        res.locals.error = 'DB 쿼리 오류';
        res.locals.errorStatus = 500;
        throw new Error('DB 오류: result에서 데이터 조회 중 오류 발생');
      }
    });

    const cardsQuery = 'SELECT image_url, explanation FROM card WHERE poll_id = ?';
    await connection.query(cardsQuery, [poll_id], (error, cardData) => {
      if (error) {
        res.locals.error = 'DB 쿼리 오류';
        res.locals.errorStatus = 500;
        throw new Error('DB 오류: card에서 데이터 조회 중 오류 발생');
      }
    });

    res.locals.data = {
      result: resultData.length > 0 ? resultData : '데이터가 없음',
      card: cardData.length > 0 ? cardData : '데이터가 없음',
    };

    next();

  } catch (error) {
    console.error(error);
    res.locals.error = error.message;
    res.locals.errorStatus = 500;
    next();
  }
}, commonResponse);

// 결과 삭제 API
// '/delete' 라우트
router.delete('/delete', async (req, res, next) => {
  /*
   #swagger.tags = ['MyPage']
   #swagger.security = [{ "Bearer": [] }]
   #swagger.summary = "결과 리스트에서 선택한 결과 및 카드 삭제"
   #swagger.description = '결과 리스트 중 선택한 결과(Poll_id)가 삭제된다. -> CASCADE로 result, card 테이블의 관련 데이터도 삭제'
   #swagger.parameters['poll_id'] = {
      in: 'query',
      description: '폴 아이디 입력',
      required: true,
      example: 'Poll_ID',
      value: '',
    } 
   #swagger.responses[500] = {
      description: '내부 서버 오류로 인한 데이터 삭제 실패.',
      schema: { message: 'DB 쿼리 오류', error: 'DB 쿼리 오류'}
    } 
   #swagger.responses[404] = {
      description: '해당 ID를 가진 폴이 존재하지 않습니다.',
      schema: { message: '해당 ID를 가진 폴이 존재하지 않습니다.', error: '해당 ID를 가진 폴이 존재하지 않습니다.' }
    } 
   #swagger.responses[403] = {
      description: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.',
      schema: { message: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.', error: 'JWT토큰의 user_id와 Poll_table의 user_id가 일치하지 않습니다.' }
    } 
   #swagger.responses[500] = {
      description: '내부 서버 오류로 인한 데이터 삭제 실패.',
      schema: { message: 'DB 쿼리 오류', error: 'DB 쿼리 오류' }
    } 
   #swagger.responses[500] = {
      description: '내부 서버 오류로 인한 데이터 삭제 실패.',
      schema: { message: 'DB 쿼리 오류', error: 'DB 쿼리 오류'}
    } 
   #swagger.responses[200] = {
      description: 'poll id에 매칭되는 column삭제 -> result, card 연쇄 삭제',
      schema: { message: 'poll 삭제 완료'}
    } 
  */
  const { poll_id } = req.query;
  const connection = db.getConnection();

  try {

    const searchQuery = 'SELECT user_id FROM poll WHERE id = ?';
    await new Promise((resolve, reject) => {
      connection.query(searchQuery, [poll_id], (error, result) => {
        if (error) {
          res.locals.error = 'DB 쿼리 오류';
          res.locals.errorStatus = 500;
          reject(new Error('DB 오류: poll에서 user_id 조회 중 오류 발생'));
        }

        if (result.length === 0) {
          res.locals.error = '해당 ID를 가진 폴이 존재하지 않습니다.';
          res.locals.errorStatus = 404;
          reject(new Error('DB 오류: 해당 유저 ID를 가진 폴이 존재하지 않습니다.'));
        }

        if (parseInt(req.user.id, 10) !== parseInt(result[0].user_id, 10)) {
          res.locals.error = '토큰과 폴 아이디가 일치하지 않습니다';
          res.locals.errorStatus = 403;
          reject(new Error('DB 오류: 토큰과 폴 아이디가 일치하지 않습니다'));
        }
      });
    });

    const deleteResultQuery = 'DELETE FROM poll WHERE id = ?';
    await new Promise((resolve, reject) => {
      connection.query(deleteResultQuery, [poll_id], (error) => {
        if (error) {
          res.locals.error = 'DB 쿼리 오류';
          res.locals.errorStatus = 500;
          reject(new Error('DB 오류: poll에서 id 삭제 중 오류 발생'));
        }
      });
    });

    res.locals.data = { message: '삭제 성공' };
    return next();

  } catch (error) {
    console.log(error);

    return next();
  }
}, commonResponse);

module.exports = router;