const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof Error ? 400 : 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, [], err.stack);
    }

    logger.error(`[${req.method}] ${req.originalUrl} >> StatusCode:: ${error.statusCode}, Message:: ${error.message}`);

    const response = {
        success: error.success,
        message: error.message,
        errors: error.errors,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
