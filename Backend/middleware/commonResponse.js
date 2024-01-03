const commonResponse = (req, res, next) => {

    // 데이터가 없으면 다음 미들웨어로 넘김
    if (!res.locals.data) return next();

    const responseData = {
        status: 'success',
        statusCode: res.locals.status || 200,
        data: res.locals.data,
    };

    res.status(res.locals.status || 200).json(responseData);
};

module.exports = commonResponse;