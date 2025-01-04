"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong...'
    };
    // if (err instanceof CustomError) {  
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
        customError.statusCode = 400;
    }
    if (err.errorResponse && err.errorResponse.code && err.errorResponse.code === 11000) {
        customError.msg = `duplicate value entered for: ${Object.keys(err.errorResponse.keyValue)}`;
        customError.statusCode = 400;
    }
    if (err.name === 'CustomError') {
        customError.msg = `ERROR: ${err}`;
    }
    return res
        .status(customError.statusCode)
        .json({
        msg: customError.msg,
        // errorBody: err
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.js.map