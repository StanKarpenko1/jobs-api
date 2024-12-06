import { Request, Response, NextFunction, ErrorRequestHandler } from "express";


export const getAllJobs = async (req: Request, res: Response ) => {
    res.send('Get All Jobs')
}

export const getJob = async (req: Request, res: Response ) => {
    res.send('Get Job by ID')
}

export const createJob = async (req: Request, res: Response ) => {
    res.send('Create Job by ID')
}

export const deleteJob = async (req: Request, res: Response ) => {
    res.send('Delete Job by ID')
}

export const updateJob = async (req: Request, res: Response ) => {
    res.send('Update Job by ID')
}