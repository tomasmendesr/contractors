const express = require('express');
const {getProfile} = require('../middleware/getProfile')
const { jobController } = require('../controllers/jobController');

const jobRouter = express.Router()

/**
 * @returns all unpaid jobs for a user (either a client or contractor), for active contracts only.
 */
 jobRouter.get('/unpaid', getProfile, jobController.getUnpaidJobs)

 /**
  * Pay for a job, a client can only pay if his balance >= the amount to pay. 
  * The amount should be moved from the client's balance to the contractor balance.
  */
 jobRouter.post('/:job_id/pay', getProfile, jobController.pay)

module.exports = {
    jobRouter,
};