const { Profile, Job, Contract, sequelize } = require('../model');
const { Op } = require("sequelize")

const getBestPaidProfession = async (req, res) => {
    const {start, end} = req.query
    if (!start || !end) res.status(400).send('start and end dates are required')
    const result = await Contract.findAll({
        include: [
            {
                model: Profile,
                as: 'Contractor',
                where: { type: 'contractor' },
                attributes: ['profession']
            },
            {
                model: Job,
                where: { 
                    paymentDate: 
                        {
                            [Op.between]: [new Date(start), new Date(end)],
                        }
                }
            },
        ],
        attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'priceSum']],
        order: [
            ['priceSum', 'desc']
        ],
        group: 'profession',
        raw: true
    })
    const profession = result.length > 0 ? result[0]['Contractor.profession'] : ''
    res.json({profession})
}

const getClientsTopSpenders = async (req, res) => {
    const {start, end, limit = 2 } = req.query
    if (!start || !end) res.status(400).send('start and end dates are required')
    const result = await Contract.findAll({
        include: [
            {
                model: Profile,
                as: 'Client',
                where: { type: 'client' },
                attributes: [
                    'id',
                    'firstName',
                    'lastName'
                ]
            },
            {
                model: Job,
                where: { 
                    paymentDate: 
                        {
                            [Op.between]: [new Date(start), new Date(end)],
                        }
                }
            },
        ],
        attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'paidSum']],
        order: [
            ['paidSum', 'desc']
        ],
        group: ['lastName'],
        raw: true
    })
    const spenderClients = result.slice(0, limit)
    const clientsData = spenderClients.map(spenderClient => {
        return {
            id: spenderClient['Client.id'],
            fullName: `${spenderClient['Client.firstName']} ${spenderClient['Client.lastName']}`,
            paid: spenderClient.paidSum
        }
    })
    res.json(clientsData)
}

const adminController = {
    getBestPaidProfession,
    getClientsTopSpenders
}

module.exports = {
    adminController,
}