const jwt = require('jsonwebtoken');

// 토큰 검증 미들웨어
const verifyToken = (req, res, next) => {
    // 'Authorization' 헤더에서 토큰 추출
    const authHeader = req.headers['authorization'];

    const token = authHeader;

    if (!token) {
        return res.status(401).json({ error: '엑세스 토큰이 필요합니다' });
    }

    try {
        // JWT 토큰 검증 및 디코딩
        const decoded = jwt.verify(token, 'your_secret_key_for_access_token');

        // 사용자 정보를 req.user에 추가
        req.user = decoded;

        next();
    } catch (error) {
        res.status(403).json({ error: '유효하지 않은 토큰입니다' });
    }
};

module.exports = verifyToken;