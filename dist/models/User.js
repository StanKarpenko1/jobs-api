"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
});
exports.UserSchema.pre('save', async function () {
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
});
exports.UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
exports.UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt_1.default.compare(canditatePassword, this.password);
    return isMatch;
};
exports.User = mongoose_1.default.model('User', exports.UserSchema);
//# sourceMappingURL=User.js.map