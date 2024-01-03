const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const userData = {
        username: '우리는',
        password: '짱이다',
        email: 'great@example.com'
    };

    res.locals.data = userData;
    next();
});

module.exports = router;