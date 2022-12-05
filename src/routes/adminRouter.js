const express = require('express');
const { adminController } = require('../controllers/adminController');

const adminRouter = express.Router()

/**
 * @return the profession that earned the most money (sum of jobs paid) for any contactor 
 * that worked in the query time range.
 */
 adminRouter.get('/best-profession', adminController.getBestPaidProfession)

 adminRouter.get('/best-clients', adminController.getBestPaidProfession)

module.exports = {
    adminRouter,
};