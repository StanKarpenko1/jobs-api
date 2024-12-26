import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IAuthenticatedRequest } from "interfaces/auth.interface";
import { Job } from "../models/Job";
import { badRequest, createCustomError, CustomError, UnauthenticatedError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";
import { notFound } from "../middleware/not-found";



export const getAllJobs = async (req: IAuthenticatedRequest, res: Response, next: NextFunction ) => {
    try {

        const jobs = await Job.find({createdBy: req.user.userId})
            .sort('createdAt');

        res.status(StatusCodes.OK).json({jobs, jobsCount: jobs.length})

    } catch (error) {
        next (error)
    }
}

export const getJob = async (req: IAuthenticatedRequest, res: Response, next: NextFunction ) => {
    try {

        const {user:{userId}, params: {id:jobId}} = req

        const job = await Job.findOne({
            _id: jobId, createdBy: userId
        })

        if (!job) {
            throw  createCustomError (`No jobs with id: ${jobId}`, StatusCodes.NOT_FOUND)
        }

        res.status(StatusCodes.OK).json ({ job })

    } catch (e) {
        next(e)
    }
}

export const createJob = async (req: IAuthenticatedRequest, res: Response, next: NextFunction ) => {
    try {
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        res.status(StatusCodes.CREATED).json({ msg: "Job created", jobData: job })

    } catch (error) {
        next(error)
    }
}

export const deleteJob = async (req: IAuthenticatedRequest, res: Response , next: NextFunction) => {
    try {
        const {
            user:{userId}, 
            params: {id:jobId}
        } = req;

        const job = await Job.findOneAndDelete({
            _id: jobId,
            createdBy: userId
        })

        if (!job) {
            throw  createCustomError (`No jobs with id: ${jobId}`, StatusCodes.NOT_FOUND)
        }

        res.status(StatusCodes.OK).json ({ msg: 'Job Deleted', job })

 
    } catch (e) {
        next(e)
    }
}

export const updateJob = async (req: IAuthenticatedRequest, res: Response, next: NextFunction ) => {
    try {

        const {
            body: {company, position},
            user:{userId}, 
            params: {id:jobId}
        } = req;

        if ( company === '' || position === ''){
            throw createCustomError (
                `Company or Position fields can not be empty`, 
                StatusCodes.NOT_FOUND)
        }

        const job = await Job.findOneAndUpdate({
            _id: jobId, createdBy: userId},
            req.body,
            {new:true, runValidators: true},
        )

        if (!job) {
            throw  createCustomError (`No jobs with id: ${jobId}`, StatusCodes.NOT_FOUND)
        }

        res.status(StatusCodes.OK).json ({ msg: 'JobUpdated', job })


    } catch (e) {
        next(e)
    }
}