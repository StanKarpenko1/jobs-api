import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const notFound = (req: Request , res: Response): void => { 
    res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        msg: `Route does not exist`
    });
}
