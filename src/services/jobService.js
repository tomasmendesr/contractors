const { Op } = require("sequelize")
const { Job } = require('../model');
const { contractService } = require('./contractService')

const getUnpaidJobsForUser = async (profileId) => {
    const activeContracts = await contractService.getUserNonTerminatedContracts(profileId)
    const activeContractIds = activeContracts.map(contract => contract.id)
    const jobs = await Job.findAll({
        where: {
            [Op.and]: [
                {
                    paid: false
                },
                {
                    ContractId: activeContractIds
                }
            ]

        }
    })
    return jobs
}

const getJobById = async (jobId) => {
    const job = await Job.findOne({
        where: {id: jobId}
    })
    return job
}

const pay = async (jobId) => {
    const job = await getJobById(jobId)
    job.paid = true
    job.paymentDate = new Date()
    await saveJob(job)
}

const saveJob = async (job) => {
    job.updatedAt = new Date()
    await job.save()
}

const findJobsBetweenDates = async (contractId, start, end) => {
    const jobs = await Job.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.gte]: start
                },
                {
                    [Op.lte]: end
                },
                {
                    ContractId: contractId
                }
            ]
        }
    })
    return jobs
}

const getJobsPriceSum = (jobs) => {
    const jobsPrices = jobs.map(job => job.dataValues.price)
    return jobsPrices.reduce((partialSum, currentValue) => partialSum + currentValue, 0)
}

const jobService = {
    getUnpaidJobsForUser,
    getJobById,
    pay,
    findJobsBetweenDates,
    getJobsPriceSum,
}

module.exports = {
    jobService,
}