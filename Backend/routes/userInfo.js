const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /userInfo:
 *   get:
 *     summary: 사용자 정보를 반환하는 API
 *     description: 사용자 ID를 기반으로 해당 사용자의 정보를 조회합니다.
 *     responses:
 *       200:
 *         description: 성공적으로 사용자 정보를 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: 우리는
 *                 password:
 *                   type: string
 *                   example: 짱이다
 *                 email:
 *                   type: string
 *                   example: great@example.com
 */
router.get('/', (req, res) => {
    // 실제 애플리케이션에서는 여기에서 userId를 사용하여 사용자 데이터를 조회할 수 있습니다.
    const userData = {
        username: '우리는',
        password: '짱이다',
        email: 'great@example.com'
    };

    res.status(200).send(userData);
});

module.exports = router;
