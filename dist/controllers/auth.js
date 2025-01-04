"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = require("../models/User");
const custom_error_1 = require("../errors/custom-error");
const custom_error_2 = require("../errors/custom-error");
exports.register = (0, custom_error_2.asyncErrorHandler)(async (req, res) => {
    const user = await User_1.User.create({ ...req.body });
    const token = user.createJWT();
    if (!user.email || !user.password) {
        throw new custom_error_1.CustomError("Provide Email and Password", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user
    });
});
exports.login = (0, custom_error_2.asyncErrorHandler)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw (0, custom_error_1.badRequest)("Provide Email and Password");
    }
    const user = await User_1.User.findOne({ email });
    if (!user) {
        throw (0, custom_error_1.UnauthenticatedError)();
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw (0, custom_error_1.UnauthenticatedError)();
    }
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user: { name: user.name },
        token,
    });
});
//# sourceMappingURL=auth.js.map