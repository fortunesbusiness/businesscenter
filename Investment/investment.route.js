const express = require('express');
const router = express.Router();

const {verifyUser,verifyAdmin} = require('../middleware/verify.token');
const investmentController = require('./investment.controller');

//route for user routes
router.get('/list',verifyAdmin,investmentController.getInvestmentRecord);
module.exports = router;