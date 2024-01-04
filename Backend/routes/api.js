const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.locals.status = 200;
    res.locals.data = { message: 'Page : api.js' };
    next();
});

module.exports = router;