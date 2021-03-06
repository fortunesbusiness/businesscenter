const express = require('express');
const router = express.Router();

const {verifyUser,verifyAdmin} = require('../middleware/verify.token');
const businessCenterController = require('./business.center.controller');

//route for business center routes
router.get('/information',verifyAdmin,businessCenterController.businessCenterShareAndDepositInformation);


module.exports = router;