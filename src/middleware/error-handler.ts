
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { createCustomError, CustomError } from '../errors/custom-error'
import { StatusCodes } from "http-status-codes";


export const errorHandlerMiddleware = (

    err: any,
    req: Request,
    res: Response,
    next: NextFunction,

): any => {

    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong...'
    }

    // if (err instanceof CustomError) {  
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item: {message: string}) => 
            item.message).join(', ');

        customError.statusCode = 400
    }

    if (err.errorResponse && err.errorResponse.code && err.errorResponse.code === 11000) {
        customError.msg = `duplicate value entered for: ${Object.keys(err.errorResponse.keyValue)}`
        customError.statusCode = 400
    }

    if (err.name === 'CustomError') {
        customError.msg = `ERROR: ${err}`
    }

    return res
        .status(customError.statusCode)
        .json({ 
            msg: customError.msg, 
            // errorBody: err
        })
}

