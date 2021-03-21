const express = require('express');
const router = express.Router();

const {verifyUser,verifyAdmin} = require('../middleware/verify.token');
const paymentController = require('./payment.controller');

//route for user routes
router.post('/send',paymentController.makePaymentUpdateRequest);
router.post('/approve',verifyAdmin,paymentController.approveUserPayment);
router.get('/request/list',paymentController.userPaymentToBeApprovedList);
router.get('/specificUser',verifyUser,paymentController.specificUserPaymentStatus);
router.get('/unapproved/count',verifyAdmin,paymentController.totalPaymentToBeApprovedCount);
router.post('/remove',verifyAdmin,paymentController.removeSpecificPayment);
router.post('/update/request/data',verifyAdmin,paymentController.updateUserPaymentRequestData);
module.exports = router;
