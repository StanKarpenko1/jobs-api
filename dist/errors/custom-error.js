"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncErrorHandler = exports.UnauthenticatedError = exports.badRequest = exports.createCustomError = exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
    }
}
exports.CustomError = CustomError;
const createCustomError = (msg, statusCode) => {
    return new CustomError(msg, statusCode);
};
exports.createCustomError = createCustomError;
const badRequest = (msg, statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST) => {
    return new CustomError(msg, statusCode);
};
exports.badRequest = badRequest;
const UnauthenticatedError = (msg = "Invalid credentials...", statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED) => {
    return new CustomError(msg, statusCode);
};
exports.UnauthenticatedError = UnauthenticatedError;
const asyncErrorHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncErrorHandler = asyncErrorHandler;
//# sourceMappingURL=custom-error.js.map