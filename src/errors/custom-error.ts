import { Request, Response, NextFunction, RequestHandler } from "express";import { StatusCodes } from "http-status-codes";
import { IAuthenticatedRequest } from "interfaces/auth.interface";

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

export const asyncErrorHandler = (
    fn: (req: IAuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

