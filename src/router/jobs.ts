import express from 'express';
const router = express.Router();

import * as jobsController from '../controllers/jobs';

router.route('/')
    .post(jobsController.createJob)
    .get(jobsController.getAllJobs)

router.route('/:id')
    .get(jobsController.getJob)
    .delete(jobsController.deleteJob)
    .patch(jobsController.updateJob)

export default router

