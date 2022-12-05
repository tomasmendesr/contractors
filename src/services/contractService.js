const { Op } = require("sequelize")
const { Contract } = require('../model');

const canViewContract = (profileId, contract) => {
    return profileId === contract.ClientId || profileId === contract.ContractorId
}

const getContractById = async (contractId) => {
    const contract = await Contract.findOne({
        where: {id: contractId}, 
        raw: true
    })
    return contract
}

const getUserNonTerminatedContracts = async (profileId) => {
    const contracts = await Contract.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { ClientId: profileId },
                        { ContractorId: profileId }
                    ]
                },
                {
                    [Op.not]: [
                        { status: 'terminated' }
                    ]
                }
            ]

        }
    })
    return contracts
}

const getUserContractsByStatus = async (profileId, statuses) => {
    const contracts = await Contract.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { ClientId: profileId },
                        { ContractorId: profileId }
                    ]
                },
                {
                     status: statuses
                }
            ]

        }
    })
    return contracts
}

const contractService = {
    canViewContract,
    getContractById,
    getUserNonTerminatedContracts,
    getUserContractsByStatus
}

module.exports = {
    contractService,
}