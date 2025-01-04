"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJob = exports.deleteJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const Job_1 = require("../models/Job");
const custom_error_1 = require("../errors/custom-error");
const http_status_codes_1 = require("http-status-codes");
const custom_error_2 = require("../errors/custom-error");
exports.getAllJobs = (0, custom_error_2.asyncErrorHandler)(async (req, res) => {
    const jobs = await Job_1.Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, jobsCount: jobs.length });
});
exports.getJob = (0, custom_error_2.asyncErrorHandler)(async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    const job = await Job_1.Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new custom_error_1.CustomError(`No jobs with id: ${jobId}`, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.createJob = (0, custom_error_2.asyncErrorHandler)(async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job_1.Job.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "Job created", jobData: job });
});
exports.deleteJob = (0, custom_error_2.asyncErrorHandler)(async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    const job = await Job_1.Job.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new custom_error_1.CustomError(`No jobs with id: ${jobId}`, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Job Deleted', job });
});
exports.updateJob = (0, custom_error_2.asyncErrorHandler)(async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId } } = req;
    if (company === '' || position === '') {
        throw new custom_error_1.CustomError('Company or Position fields cannot be empty', http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const job = await Job_1.Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new custom_error_1.CustomError(`No jobs with id: ${jobId}`, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Job Updated', job });
});
//# sourceMappingURL=jobs.js.map