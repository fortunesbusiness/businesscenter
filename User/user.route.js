const express = require('express');
const router = express.Router();

const {verifyUser,verifyAdmin} = require('../middleware/verify.token');
const userController = require('./user.controller');

//route for user routes
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/profile',verifyUser,userController.profile);
router.get('/request',verifyAdmin,userController.requestedUserList);
router.post('/approve',verifyAdmin,userController.approveUser);
router.post('/reject',verifyAdmin,userController.rejectUser);
router.get('/dashboard',verifyUser,userController.getUserDashboard);
router.get('/registered/member/list',verifyAdmin,userController.registeredMemberList);
router.post('/add/profit',verifyAdmin,userController.addProfit);
router.get('/profit',verifyUser,userController.getProfit);
router.post('/update/email',verifyUser,userController.updateEmail);
router.post('/update/spouse',verifyUser,userController.updateSpouseInformation);
router.post('/update/phone',verifyUser,userController.updatePhone);
router.post('/update/presentaddress',verifyUser,userController.updatePresentAddress);
router.get('/count/totalregistereduser',userController.getTotalRegisteredUserCount);
router.get('/count/totalrequesteduser',userController.getTotalRequestedUserCount);
router.post('/invest',userController.investForSpecificUser);
router.get('/investment/record',verifyUser,userController.getInvestmentRecord);
router.post('/upgrade/membership',verifyUser,userController.membershipUpgradeRequest);
router.post('/accept/upgrade/membership',verifyAdmin,userController.acceptMembershipUpgradgeRequest);
router.post('/delete/upgrade/membership',verifyAdmin,userController.deleteMembershipUpgradgeRequest);
module.exports = router;