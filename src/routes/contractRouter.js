const express = require('express');
const {getProfile} = require('../middleware/getProfile')
const { contractController } = require('../controllers/contractController');

const contractRouter = express.Router()

/**
 * @returns contract by id
 */
 contractRouter.get('/:id', getProfile, contractController.getContractById)

/**
 * @returns list of non terminated contracts belonging to a user (client or contractor)
 */
 contractRouter.get('/', getProfile, contractController.getNonTerminatedContracts)

module.exports = {
    contractRouter,
};