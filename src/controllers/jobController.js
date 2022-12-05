const { jobService } = require('../services/jobService');

const getUnpaidJobs = async (req, res) => {
    const profileId = req.profile.dataValues.id
    const unpaidJobs = await jobService.getUnpaidJobsForUser(profileId)
    res.json(unpaidJobs)
}

const jobController = {
    getUnpaidJobs,
}

module.exports = {
    jobController,
}