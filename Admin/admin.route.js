const express = require('express');
const router = express.Router();

const adminController = require('./admin.controller');
const {verifyAdmin} = require('../middleware/verify.token');

//route for admin
router.post('/create',adminController.createAdmin);
router.post('/change/username',adminController.updateAdminUsername);
router.post('/change/password',adminController.updateAdminPassword);
router.post('/login',adminController.adminLogin);
router.get('/dashboard',verifyAdmin,adminController.getTotalRequestAndRegisteredmember);

module.exports = router;
