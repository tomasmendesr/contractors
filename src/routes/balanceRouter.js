const express = require('express');
const { balanceController } = require('../controllers/balanceController');

const balanceRouter = express.Router()

/**
 * Deposits money into the balance of a client, a client can't deposit more 
 * than 25% his total of jobs to pay. (at the deposit moment)
 */
 balanceRouter.post('/deposit/:userId', balanceController.deposit)

module.exports = {
    balanceRouter,
};