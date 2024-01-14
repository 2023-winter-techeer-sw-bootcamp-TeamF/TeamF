const express = require('express');
const commonResponse = require('../middleware/commonResponse');
const db = require('../mysql/database.js');
const gptApi = require('../chatgpt/api.js');
const router = express.Router();

router.post('/save', async (req, res, next) => {
    // #swagger.tags = ['Result']
    // #swagger.security = [{ "Bearer": [] }]
    // #swagger.summary = "종합 결과 저장"
    // #swagger.description = '사용자의 질문과 관련된 타로 종합 결과 및 뽑은 카드 정보를 저장합니다. 사용자의 운(luck)에 따라 카드의 수가 결정됩니다.'
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: '타로 결과 및 뽑은 카드 정보 저장을 위한 요청값',
        required: true,
        schema: {
            poll_id: '1',
            question: '사용자 질문',
            result_explanation: '종합 결과',
            master_name: '마스터 이름',
            luck: 'test_luck',
            cards: [
                {
                    card_image_url: 'url1',
                    card_explanation: 'explanation1',
                    card_eng_name: 'eng1',
                    card_kor_name: 'kor1'
                },
                {
                    card_image_url: 'url2',
                    card_explanation: 'explanation2',
                    card_eng_name: 'eng2',
                    card_kor_name: 'kor2'
                },
                {
                    card_image_url: 'url3',
                    card_explanation: 'explanation3',
                    card_eng_name: 'eng3',
                    card_kor_name: 'kor3'
                }
            ]
        }
    } */
    const { poll_id, question, result_explanation, master_name, luck, cards } = req.body;

    // 누락 여부 체크
    let missingParameter = null;

    if (!poll_id) {
        missingParameter = "Poll 아이디 누락";
    } else if (!question) {
        missingParameter = "사용자 질문 누락";
    } else if (!result_explanation) {
        missingParameter = "종합 결과 누락";
    } else if (!master_name) {
        missingParameter = "타로 마스터 이름 누락";
    } else if (!luck) {
        missingParameter = "운 종류 누락";
    }

    if (missingParameter) {
        res.status(400).json({ message: missingParameter });
        /*  #swagger.responses[400] = {
            description: '잘못된 요청',
            schema: { message: '데이터가 유효하지 않습니다. (널값, 누락 등)' }
        } */
        return;
    }

    // 데이터베이스 연결
    const connection = db.getConnection();

    // 폴 아이디 조회
    const poll_query = "SELECT * FROM poll WHERE id = ?";
    connection.query(poll_query, [poll_id], async (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: '데이터베이스 오류', error });
            return;
        }

        if (results.length === 0) {
            res.status(400).json({ message: "폴 아이디가 유효하지 않습니다." });
            return;
        }

        // 검색된 폴의 complete 상태 확인
        const poll = results[0];
        if (poll.complete === 1) {
            res.status(400).json({ message: "이미 결과를 저장하셨습니다." });
            return;
        }

        // luck에 따른 card_num 조회
        const getCardNum = new Promise((resolve, reject) => {
            const luck_query = "SELECT card_num FROM luck_list WHERE luck = ?";
            connection.query(luck_query, [luck], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.length > 0 ? results[0].card_num : 0);
                }
            });
        });

        let cardNum = 0;
        try {
            cardNum = await getCardNum;
            if (cards.length !== cardNum) {
                throw new Error(`카드 수가 일치하지 않습니다. 기대되는 카드 수: ${cardNum}, 요청된 카드 수: ${cards.length}`);
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        // 타로 종합 결과 저장 쿼리
        const result_query = "INSERT INTO result (poll_id, question, explanation, master_name, luck) VALUES (?, ?, ?, ?, ?)";
        const result_params = [poll_id, question, result_explanation, master_name, luck];

        // 타로 종합 결과 저장 (Promise 사용)
        const insertResult = new Promise((resolve, reject) => {
            connection.query(result_query, result_params, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });

        // 카드 저장 쿼리 실행 및 결과 기다림
        const insertCards = cards.slice(0, cardNum).map((card, index) => {
            return new Promise((resolve, reject) => {
                const cards_query = "INSERT INTO card (poll_id, image_url, explanation, eng_name, kor_name, ordered) VALUES (?, ?, ?, ?, ?, ?)";
                const cards_params = [poll_id, card.card_image_url, card.card_explanation, card.card_eng_name, card.card_kor_name, index];
                connection.query(cards_query, cards_params, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.insertId);
                    }
                });
            });
        });

        /* #swagger.responses[200] = {
        description: "타로 종합 결과, 뽑은 카드별 정보 저장 성공",
        schema: {
            message: "타로 종합 결과, 뽑은 카드별 정보 저장 성공",
            resultId: 26,
            cardIds: [1, 2, 3]
        }
    } */

        /* #swagger.responses[400] = {
            description: '잘못된 요청',
            schema: { message: '데이터가 유효하지 않습니다. (널값, 누락 등)' }
        } */

        /* #swagger.responses[500] = {
            description: '내부 서버 오류로 인한 데이터 처리 실패.',
            schema: { message: 'DB 오류' }
        } */

        // 모든 프로미스 처리
        try {
            let resultId = await insertResult;
            let cardIds = await Promise.all(insertCards);

            // 결과 저장이 완료된 poll 테이블의 complete 열을 1로 업데이트
            const updateCompleteQuery = "UPDATE poll SET complete = 1 WHERE id = ?";
            connection.query(updateCompleteQuery, [poll_id], (updateError, updateResults) => {
                if (updateError) {
                    res.status(500).json({ message: '데이터베이스 오류', error: updateError });
                } else {
                    res.json({
                        message: '타로 종합 결과, 뽑은 카드별 정보 저장 성공',
                        resultId,
                        cardIds
                    });
                }
            });
        } catch (error) {
            res.status(500).json({ message: '데이터베이스 오류', error });
        }
    });
});

module.exports = router;