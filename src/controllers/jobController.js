const { jobService } = require('../services/jobService');
const { contractService } = require('../services/contractService');
const { profileService } = require('../services/profileService');

const getUnpaidJobs = async (req, res) => {
    const profileId = req.profile.dataValues.id
    const unpaidJobs = await jobService.getUnpaidJobsForUser(profileId)
    res.json(unpaidJobs)
}

const pay = async (req, res) => {
    if (req.profile.dataValues.type !== 'client') return res.status(403).end()
    const {job_id} = req.params
    const job = await jobService.getJobById(job_id)
    if (!job) return res.status(404).end()
    if (job.paid) return res.status(400).send('job has already been paid').end()
    if (req.profile.dataValues.balance < job.dataValues.price) return res.status(400).send('insufficient balance').end()
    try {
        const jobContract = await contractService.getContractById(job.dataValues.ContractId)
        await jobService.pay(job_id)
        await profileService.updateBalance(jobContract.ClientId, job.price * (-1))
        await profileService.updateBalance(jobContract.ContractorId, job.price)
        res.status(200).end()
    } catch (err) {
        console.log(`could not pay for job with id ${job_id}. error ${err}`)
        res.status(500).end()
    }
}

const jobController = {
    getUnpaidJobs,
    pay
}

module.exports = {
    jobController,
}