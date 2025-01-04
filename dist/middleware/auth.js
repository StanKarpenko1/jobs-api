"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_1 = require("../errors/custom-error");
const auth = function (req, res, next) {
    try {
        // check header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw (0, custom_error_1.UnauthenticatedError)();
        }
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // attach user to the job router
        req.user = { userId: payload.userId, name: payload.name };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map