const express = require('express');
const { adminController } = require('../controllers/adminController');

const adminRouter = express.Router()

/**
 * @return the profession that earned the most money (sum of jobs paid) for any contactor 
 * that worked in the query time range.
 */
 adminRouter.get('/best-profession', adminController.getBestPaidProfession)

 /**
  * @returns the clients the paid the most for jobs in the query time period. 
  * limit query parameter should be applied, default limit is 2.
  */
 adminRouter.get('/best-clients', adminController.getClientsTopSpenders)

module.exports = {
    adminRouter,
};