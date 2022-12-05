const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

const canViewContract = (profileId, contract) => {
    return profileId === contract.ClientId || profileId === contract.ContractorId
}

/**
 * @returns contract by id
 */
app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const contract = await Contract.findOne({where: {id}, raw: true})
    if (!canViewContract(req.profile.dataValues.id, contract)) return res.status(403).end()
    if(!contract) return res.status(404).end()
    res.json(contract)
})
module.exports = app;
