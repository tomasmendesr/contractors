const { Op } = require("sequelize")
const { Contract } = require('../model');

const canViewContract = (profileId, contract) => {
    return profileId === contract.ClientId || profileId === contract.ContractorId
}

const getContractById = async (contractId) => {
    const contract = await Contract.findOne({
        where: {id: contractId}
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

const getContractsForContractors = async (contractorIds) => {
    const contracts = await Contract.findAll({
        where: {
            ContractorId: contractorIds
        }
    })
    return contracts
}

const contractService = {
    canViewContract,
    getContractById,
    getUserNonTerminatedContracts,
    getContractsForContractors
}

module.exports = {
    contractService,
}