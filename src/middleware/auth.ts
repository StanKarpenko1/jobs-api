import { User } from "../models/User";
import jwt from 'jsonwebtoken';
import { badRequest, createCustomError, CustomError, UnauthenticatedError } from "../errors/custom-error";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IAuthenticatedRequest } from '../interfaces/auth.interface';


export const auth = function (req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    try {

        // check header
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw UnauthenticatedError()
        }
        const token = authHeader.split(' ')[1]

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        // attach user to the job router
        req.user = {userId: (payload as any).userId, name: (payload as any).name}
        next()
    } catch (error) {

        next(error)
    }

}
