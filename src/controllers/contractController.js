const { contractService } = require('../services/contractService');

const getContractById = async (req, res) => {
    const {id} = req.params
    const contract = await contractService.getContractById(id)
    if (!contractService.canViewContract(req.profile.dataValues.id, contract)) return res.status(403).end()
    if(!contract) return res.status(404).end()
    res.json(contract)
}

 const getNonTerminatedContracts = async (req, res) => {
    const profileId = req.profile.dataValues.id
    const contracts = await contractService.getUserNonTerminatedContracts(profileId)
    res.json(contracts)
}

const contractController = {
    getContractById,
    getNonTerminatedContracts
}

module.exports = {
    contractController,
}