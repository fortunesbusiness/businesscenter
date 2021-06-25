const express = require('express');
const router = express.Router();

const {verifyAdmin} = require('../middleware/verify.token');
const investmentController = require('./investment.controller');

//route for user routes
router.get('/list',verifyAdmin,investmentController.getInvestmentRecord);
router.post('/update/total',verifyAdmin,investmentController.updateTotalInvestmentAmount);
router.post('/update/food',verifyAdmin,investmentController.updateFoodInvestmentAmount);
router.post('/update/health',verifyAdmin,investmentController.updateHealthInvestmentAmount);
router.post('/update/vehicle',verifyAdmin,investmentController.updateVehicleInvestmentAmount);
router.post('/update/education',verifyAdmin,investmentController.updateEducationInvestmentAmount);
router.post('/update/residence',verifyAdmin,investmentController.updateResidenceInvestmentAmount);
router.post('/update/garments',verifyAdmin,investmentController.updateClothsInvestmentAmount);
module.exports = router;
