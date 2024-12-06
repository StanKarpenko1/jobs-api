
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import {createCustomError, CustomError} from '../errors/custom-error'
import { StatusCodes } from "http-status-codes";


export const errorHandlerMiddleware = (

    err: any,
    req: Request,
    res: Response,
    next: NextFunction,

): any => {

    const errorStatus = err.statusCode;

    if (err instanceof CustomError) {
        return res.status(errorStatus).json({ msg: err.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error'})

}

