import { Request, Response, NextFunction, ErrorRequestHandler } from "express";


export const register = async (req: Request, res: Response ) => {
    res.send('Register User')
}

export  const login = async (req: Request, res: Response ) => {
    res.send('Login User')
}

