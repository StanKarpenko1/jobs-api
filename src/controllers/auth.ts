import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";


export const register = async (req: Request, res: Response) => {

    try {
        // Check if email exist 
        const { email } = req.body;
        const existingUserEmail = await User.findOne({ email })
        if (existingUserEmail) {
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: "This email already exist"
            })
            return;
        }

        // create user
        const user = await User.create({ ...req.body });

        res
            .status(StatusCodes.CREATED)
            .json({

                msg: "Created",
                data: user
            })
            

    } catch (e) {
        console.error("Error in register:", e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Something went wrong",
        });
    }
}

export const login = async (req: Request, res: Response) => {
    res.send('Login User')
}

