import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";


export const register = async (req: Request, res: Response) => {

    try {

        //#region commented code
        //***THIS WHOLE CHUMK BELOW IS NOT NEEDED 
        // AS IT IS TAKEN CARE OF WITH MONGOOSE */
        // const { email, name, password } = req.body;

        // // create random bytes
        // const salt = await bcrypt.genSalt(10)

        // // encrypting password
        // const hashedPassword = await bcrypt.hash( password, salt ) 

        // const tempUser = { email, name, password: hashedPassword }

        // const existingUserEmail = await User.findOne({ email })
        // if (existingUserEmail) {
        //     res.status(StatusCodes.BAD_REQUEST).json({
        //         msg: "This email already exist"
        //     })
        //     return;
        // }
        //#endregion commented code

        // create user
        const user = await User.create({ ...req.body});
        const token = user.createJWT()
        res
            .status(StatusCodes.CREATED)
            .json({

                msg: "Created",
                
                newUser: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: token

            })


    } catch (e) {

        console.error("Error in register:", e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Something went wrong",
            error: e.message
        });
        
    }
}

export const login = async (req: Request, res: Response) => {
    res.send('Login User')
}

