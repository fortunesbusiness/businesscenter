const express = require('express');
const router = express.Router();

const {verifyUser,verifyAdmin} = require('../middleware/verify.token');
const paymentController = require('./payment.controller');

//route for user routes
router.post('/send',paymentController.makePaymentUpdateRequest);
router.post('/approve',verifyAdmin,paymentController.approveUserPayment);
router.get('/request/list',paymentController.userPaymentToBeApprovedList);
router.get('/specificUser',verifyUser,paymentController.specificUserPaymentStatus);

module.exports = router;