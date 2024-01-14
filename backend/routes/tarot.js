const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const s3 = require('../aws/awsS3');
const router = express.Router();

router.get('/guide', async (req, res, next) => {
    // Swagger 문서화
    // #swagger.summary = '가이드라인 불러오기'
    // #swagger.description = '운 종류와 뽑는 사람 수를 전달하면 가이드라인(content)과 타로 마스터 이름(master_name)을 반환함'
    // #swagger.tags = ['Tarot']
    /* #swagger.parameters['luckType'] = {
           in: 'query',
           description: '운 종류',
           required: true,
           type: 'string',
           example: '오늘의 운세, 애정운, 우정운, 재물운, 소망운',
           value: 'test_luck"
        } */
    /* #swagger.parameters['luckOpt'] = {
            in: 'query',
            description: '카드를 뽑는 사람의 수',
            required: true,
            type: 'integer',
            example: '0(혼자 보는 경우), 1(같이 보는 경우)',
            value: '0'
        } */
    /*  #swagger.responses[200] = {
            description: '테스트 값 조회 성공',
            schema: {
            message: "가이드라인과 타로 마스터 이름 불러오기 성공",
            data: {
                "master_name": "test_master_name",
                "content": "test_content"
                }
            }
        } */
    /*  #swagger.responses[400] = {
            description: '잘못된 요청',
            schema: {
            message: '운 종류나 뽑는 사람 수가 없습니다.'
            }
    } */
    /*  #swagger.responses[500] = {
             description: 'DB 조회 과정에서 오류 발생 시의 응답',
             schema: {
                "message": "DB 조회 오류",
                "error": "운 카테고리 Table에서 데이터 조회 중 오류 발생"
                }
        } */
    

    const { luckType, luckOpt } = req.query;

    if( !luckType || !luckOpt) {
        res.locals.status = 400;
        res.locals.data = { message: '운 종류나 뽑는 사람 수가 없습니다.' };
        return next();
    }

    // 운 카테고리 Table에서 가이드라인 내용 조회

    // 쿼리가 성공하면 resolve를 호출하여 결과를 반환하고, 실패하면 reject를 호출하여 에러를 반환
    const getLuckList = (luckType, luckOpt) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM luck_list WHERE luck = ? AND opt = ?";
            connection.query(query, [luckType, luckOpt], (error, results, fields) => {
                if (error) {
                    reject({ message: 'DB 조회 오류', error: '운 카테고리 Table에서 데이터 조회 중 오류 발생' });
                } else {
                    resolve(results);
                }
            });
        });
    };
    
    // async/await을 사용하여 비동기 처리
    try {
        const results = await getLuckList(luckType, luckOpt);
        
        if (results.length > 0) {
            // 조회 성공 시, 타로 마스터 이름과 가이드라인 내용 전달
            res.locals.data = { 
                master_name: results[0].master_name,
                content: results[0].content
            };
            next();
        } else {
            res.status(500).json({ message: 'DB 조회 오류', error: '운 카테고리 Table에서 데이터 조회 중 오류 발생' });
            return next();
        }
    } catch (error) {
        res.status(500).json({ message: 'DB 조회 오류', error: '운 카테고리 Table에서 데이터 조회 중 오류 발생' });
        return next();
    }

}, commonResponse); // commonResponse 미들웨어를 체인으로 추가

router.post('/card/info', async (req, res, next) => {
    // #swagger.tags = ['Tarot']
    // #swagger.summary = "카드 정보 조회"
    // #swagger.description = '카드 정보를 정수형으로 전달하면 해당 카드의 정보를 반환함'
    /*  #swagger.responses[200] = {
            description: '카드 정보 불러오기 성공 url 전송',
            schema: {
                message: 'creat image url successfully',
                name: '카드 이름',
                english: '카드 영어 이름',
                mean: '카드 뜻',
                image_url: '카드 이미지 url'
            }
        } */
    /*  #swagger.responses[400] = {
            description: '잘못된 카드 번호 요청',
            schema: { message: '카드 번호가 없습니다.' }
        } */
    /*  #swagger.responses[500] = {
            description: 'S3 관련 오류 발생 시의 응답',
            schema: { message: '카드 정보를 가져오는데 실패했습니다.' }
        } */
    /* #swagger.parameters['card'] = { 
        in: 'query',
        description: '카드 번호', 
        required: true,
        type: 'integer',
        example: '1',
        schema: {
          card: 1
        }
    } */

    let result = null;
    let dataObject = null;
    const cardNum = req.query.card; // 카드 번호 저장
    if (!cardNum) {
        res.locals.status = 400;
        res.locals.data = { message: '카드 넘버가 없습니다.' };
        return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }

    if (cardNum < 1 || cardNum > 78) {
        res.locals.status = 400;
        res.locals.data = { message: '카드 넘버가 잘못되었습니다.' };
        return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
    try {
        const bucketList = await s3.getbucketList(); // 연결된 S3에서 파일을 리스트로 가져옴
        const index = await s3.findIndex(bucketList, cardNum); // 카드 번호를 통해 S3에서 파일의 인덱스를 가져옴
        const fileName = await s3.getObjectName(index); // 파일명을 가져옴
        const onlyFileName = await s3.getObjectNames(bucketList, index); // 파일명을 가져옴
        dataObject = s3.getDataObject(onlyFileName); // 파일명을 통해 데이터를 가져옴
        result = await s3.getS3ImageURL(fileName); // 파일명을 통해 S3에서 이미지 주소를 가져옴

    } catch (error) {
        console.log(error);
        res.locals.status = 500;
        res.locals.data = { message: '카드 정보를 가져오는데 실패했습니다.' };
        return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
    res.locals.data = {
        message: 'creat image url successfully',
        name: dataObject.name,
        english: dataObject.english,
        mean: dataObject.mean,
        image_url: result
    };
    next();
}, commonResponse); // commonResponse 미들웨어를 체인으로 추가

module.exports = router;