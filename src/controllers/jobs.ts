import { Request, Response, NextFunction } from "express";
import { IAuthenticatedRequest } from "interfaces/auth.interface";
import { Job } from "../models/Job";
import { createCustomError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../errors/custom-error";

export const getAllJobs = asyncErrorHandler(async (req: IAuthenticatedRequest, res: Response) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, jobsCount: jobs.length });
});

export const getJob = asyncErrorHandler(async (req: IAuthenticatedRequest, res: Response) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });

    if (!job) {
        throw createCustomError(`No jobs with id: ${jobId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ job });
});

export const createJob = asyncErrorHandler(async (req: IAuthenticatedRequest, res: Response) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "Job created", jobData: job });
});

export const deleteJob = asyncErrorHandler(async (req: IAuthenticatedRequest, res: Response) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

    if (!job) {
        throw createCustomError(`No jobs with id: ${jobId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ msg: 'Job Deleted', job });
});

export const updateJob = asyncErrorHandler(async (req: IAuthenticatedRequest, res: Response) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId }
    } = req;

    if (company === '' || position === '') {
        throw createCustomError('Company or Position fields cannot be empty', StatusCodes.BAD_REQUEST);
    }

    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true },
    );

    if (!job) {
        throw createCustomError(`No jobs with id: ${jobId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ msg: 'Job Updated', job });
});
