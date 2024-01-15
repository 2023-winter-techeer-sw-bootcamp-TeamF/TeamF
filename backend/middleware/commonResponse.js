const commonResponse = (req, res, next) => {
    if(res.locals.ignore == true) return next();

    // 오류 처리
    if (res.locals.error) {
        const statusCode = res.locals.errorStatus || 500;
        const errorResponse = {
            status: 'failed',
            statusCode: statusCode,
            error: res.locals.error
        };
        return res.status(statusCode).json(errorResponse);
    }

    // 데이터 처리
    if (res.locals.data) {
        const successResponse = {
            status: 'success',
            statusCode: res.locals.status || 200,
            data: res.locals.data
        };
        return res.status(res.locals.status || 200).json(successResponse);
    }

    // 데이터가 없는 경우 기본 응답
    return res.status(404).json({ status: 'failed', statusCode: 404, error: 'Not Found' });
};

module.exports = commonResponse;
