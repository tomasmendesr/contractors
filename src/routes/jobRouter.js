const express = require('express');
const {getProfile} = require('../middleware/getProfile')
const { jobController } = require('../controllers/jobController');

const jobRouter = express.Router()

/**
 * @returns all unpaid jobs for a user (either a client or contractor), for active contracts only.
 */
 jobRouter.get('/unpaid', getProfile, jobController.getUnpaidJobs)

module.exports = {
    jobRouter,
};