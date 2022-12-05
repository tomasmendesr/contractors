const { Op } = require("sequelize")
const { Job } = require('../model');
const { contractService } = require('./contractService')

const getUnpaidJobsForUser = async (profileId) => {
    const activeContracts = await contractService.getUserNonTerminatedContracts(profileId)
    const activeContractIds = activeContracts.map(contract => contract.id)
    console.log("activeContractIds: ", activeContractIds)
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

const jobService = {
    getUnpaidJobsForUser,
}

module.exports = {
    jobService,
}