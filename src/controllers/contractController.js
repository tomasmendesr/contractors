const { Op } = require("sequelize")

const canViewContract = (profileId, contract) => {
    return profileId === contract.ClientId || profileId === contract.ContractorId
}

const getContractById = async (req, res) => {
    console.log("llegue mama")
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const contract = await Contract.findOne({where: {id}, raw: true})
    if (!canViewContract(req.profile.dataValues.id, contract)) return res.status(403).end()
    if(!contract) return res.status(404).end()
    res.json(contract)
}

 const getContracts = async (req, res) => {
    const {Contract} = req.app.get('models')
    const profileId = req.profile.dataValues.id
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
    res.json(contracts)
}

const contractController = {
    getContractById,
    getContracts
}

module.exports = {
    contractController,
}