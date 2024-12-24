import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IAuthenticatedRequest } from "interfaces/auth.interface";


export const getAllJobs = async (req: Request, res: Response ) => {
    res.send('Get All Jobs')
}

export const getJob = async (req: Request, res: Response ) => {
    res.send('Get Job by ID')
}

export const createJob = async (req: IAuthenticatedRequest, res: Response ) => {
    res.json(req.user)
}

export const deleteJob = async (req: Request, res: Response ) => {
    res.send('Delete Job by ID')
}

export const updateJob = async (req: Request, res: Response ) => {
    res.send('Update Job by ID')
}