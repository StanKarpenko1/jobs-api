import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import { badRequest, CustomError, UnauthenticatedError } from "../errors/custom-error";
import { asyncErrorHandler } from "../errors/custom-error";
import { IAuthenticatedRequest } from "interfaces/auth.interface";

export const register = asyncErrorHandler(async (req: IAuthenticatedRequest, res: Response) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    if (!user.email || !user.password) {
        throw new CustomError("Provide Email and Password", StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.CREATED).json({
        // msg: "Created",
        // newUser: {
        //     id: user._id, 
        //     name: user.name,
        //     email: user.email,
        // },
        // token,
        user
    });
});

export const login = asyncErrorHandler( async(req: Request, res: Response ) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw badRequest("Provide Email and Password");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw UnauthenticatedError();
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw UnauthenticatedError();
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user: { name: user.name },
        token,
    });
});
