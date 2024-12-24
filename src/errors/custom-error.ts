import { StatusCodes } from "http-status-codes";

export interface CustomErrorType extends Error {
    statusCode: number;
}

export class CustomError extends Error implements CustomErrorType { 
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
    }
}

export const createCustomError = (msg: string, statusCode: number): CustomError => {
    return new CustomError(msg, statusCode);

};

export const badRequest = (msg: string, statusCode = StatusCodes.BAD_REQUEST): CustomError => {
    return new CustomError(msg, statusCode);
};

export const UnauthenticatedError = (msg = "Invalid credentials...", statusCode = StatusCodes.UNAUTHORIZED): CustomError => {
    return new CustomError(msg, statusCode);
};




