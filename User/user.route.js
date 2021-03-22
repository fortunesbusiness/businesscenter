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
router.post('/profit/list',verifyAdmin,userController.getUserProfitList);
router.post('/update/email',verifyUser,userController.updateEmail);
router.post('/update/spouse',verifyUser,userController.updateSpouseInformation);
router.post('/update/phone',verifyUser,userController.updatePhone);
router.post('/update/presentaddress',verifyUser,userController.updatePresentAddress);
router.get('/count/totalregistereduser',userController.getTotalRegisteredUserCount);
router.get('/count/totalrequesteduser',userController.getTotalRequestedUserCount);
router.post('/invest',userController.investForSpecificUser);
router.get('/investment/record',verifyUser,userController.getInvestmentRecord);
router.post('/upgrade/membership',verifyUser,userController.membershipUpgradeRequest);
router.post('/accept/membershipupgraderequest',verifyAdmin,userController.acceptMembershipUpgradgeRequest);
router.post('/delete/membershipupgraderequest',verifyAdmin,userController.deleteMembershipUpgradgeRequest);
router.get('/membershipupgradge/request/count',verifyAdmin,userController.membershipUpgradgeRequestCount);
router.get('/membership/request',verifyAdmin,userController.membershipUpgradgeRequestList);
router.get('/sharenumber',verifyUser,userController.getTotalShareNumber);
router.get('/dueamount',verifyUser,userController.getTotalDueAmount);
router.post('/remove',verifyAdmin,userController.removeUser);
router.post('/update/username',verifyAdmin,userController.updateUserName);
router.post('/update/userfathername',verifyAdmin,userController.updateUserFatherName);
router.post('/update/usermothername',verifyAdmin,userController.updateUserMotherName);
router.post('/update/userspousename',verifyAdmin,userController.updateUserSpouseName);
router.post('/update/userphonenumber',verifyAdmin,userController.updateUserPhone);
router.post('/update/useremail',verifyAdmin,userController.updateUserEmail);
router.post('/update/usernidnumber',verifyAdmin,userController.updateUserNid);
router.post('/update/businessid',verifyAdmin,userController.updateUserBusinessId);
router.post('/update/dob',verifyAdmin,userController.updateUserDateOfBirth);
router.post('/update/password',verifyAdmin,userController.updateUserPassword);
router.post('/update/userpresentaddress',verifyAdmin,userController.updateUserPresentAddress);
router.post('/update/permanentaddress',verifyAdmin,userController.updateUserPermanentAddress);
router.post('/update/referencenumber',verifyAdmin,userController.updateUserReferenceNumber);
router.post('/update/dueamount',verifyAdmin,userController.updateUserDueAmount);
router.post('/update/totaldeposit',verifyAdmin,userController.updateUserTotalDepositAmount);
router.post('/update/totalshare',verifyAdmin,userController.updateUserTotalShare);
router.post('/update/totalprofit',verifyAdmin,userController.updateUserTotalProfit);
router.post('/update/nominee/name',verifyAdmin,userController.updateUserNomineeName);
router.post('/update/nominee/relation',verifyAdmin,userController.updateUserNomineeRelationship);
router.post('/update/nominee/nid',verifyAdmin,userController.updateUserNomineeNidNumber);
router.post('/update/nominee/mobile',verifyAdmin,userController.updateUserNomineeMobileNumber);
router.post('/update/nominee/image',verifyAdmin,userController.updateUserNomineeImage);
router.post('/update/nominee/nidimage',verifyAdmin,userController.updateUserNomineeAttachment);
router.post('/update/image',verifyAdmin,userController.updateUserImage);
router.post('/update/nidimage',verifyAdmin,userController.updateUserNidImage);
router.post('/remove/payment',verifyAdmin,userController.removeSpecificUserPayment);
router.post('/update/payment',verifyAdmin,userController.updateSpecificUserPayment);


module.exports = router;
