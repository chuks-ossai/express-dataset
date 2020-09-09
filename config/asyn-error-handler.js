const asyncErrorHandler = middleware => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            console.error(err);
            next(err);
        }
    };
};

module.exports = asyncErrorHandler