const { profileService } = require('../services/profileService');
const { jobService } = require('../services/jobService');

const deposit = async (req, res) => {
    const { userId } = req.params
    const { amount } = req.body
    if (!amount) res.status(400).send('amount is required').end()
    const unpaidJobs = await jobService.getUnpaidJobsForUser(userId)
    const unpaidJobsTotalAmount = jobService.getJobsPriceSum(unpaidJobs)
    if (amount > (unpaidJobsTotalAmount * 0.25)) res.status(400).send('cant deposit more than 25% clients total of jobs to pay').end()
    try {
        await profileService.updateBalance(userId, amount)
        res.status(200).end()
    } catch (err) {
        console.error(`could not deposit. error: ${error}`)
        res.send(500).end()
    }
}

const balanceController = {
    deposit,
}

module.exports = {
    balanceController,
}