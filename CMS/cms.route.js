const express = require('express');
const router = express.Router();

const {verifyAdmin} = require('../middleware/verify.token');
const homePageCMSController = require('./controllers/home.page.cms.controller');
const aboutPageCMSController = require('./controllers/about.page.cms.controller');
const contactPageCMSController = require('./controllers/contact.page.cms.controller');
const policyPageCMSController = require('./controllers/policy.page.cms.controller');
//route for Content Management 

//  <----Fortunes Title ---->
router.get('/fortunes/title',homePageCMSController.getFortunesBusinessTitle);
router.get('/fortunes/title/image',homePageCMSController.getFortunesBusinessTitle);
router.post('/fortunes/title',homePageCMSController.postFortunesBusinessTitle);
router.put('/fortunes/title',homePageCMSController.updateFortunesBusinessTitle);
router.delete('/fortunes/title/:_id',homePageCMSController.deleteFortunesBusinessTitle);
router.post('/fortunes/title/image',homePageCMSController.postFortunesBusinessTitleImage);
router.get('/fortunes/title/list',homePageCMSController.getFortunesBusinessTitleData);

//  <----Fortunes Goal ---->
router.get('/fortunes/goal',homePageCMSController.getFortunesBusinessGoal);
router.get('/fortunes/goal/image',homePageCMSController.getFortunesBusinessGoal);
router.post('/fortunes/goal',homePageCMSController.postFortunesBusinessGoal);
router.put('/fortunes/goal',homePageCMSController.updateFortunesBusinessGoal);
router.delete('/fortunes/goal/:_id',homePageCMSController.deleteFortunesBusinessGoal);
router.post('/fortunes/goal/image',homePageCMSController.postFortunesBusinessGoalImage);
router.get('/fortunes/goal/list',homePageCMSController.getFortunesBusinessGoalData);

//  <----Fortunes Ownership ---->
router.get('/fortunes/ownership',homePageCMSController.getFortunesBusinessOwnership);
router.get('/fortunes/ownership/image',homePageCMSController.getFortunesBusinessOwnership);
router.post('/fortunes/ownership',homePageCMSController.postFortunesBusinessOwnership);
router.put('/fortunes/ownership',homePageCMSController.updateFortunesBusinessOwnership);
router.delete('/fortunes/ownership/:_id',homePageCMSController.deleteFortunesBusinessOwnership);
router.post('/fortunes/ownership/image',homePageCMSController.postFortunesBusinessOwnershipImage);
router.get('/fortunes/ownership/list',homePageCMSController.getFortunesBusinessOwnershipData);

//  <----Fortunes Management ---->
router.get('/fortunes/management',homePageCMSController.getFortunesBusinessManagement);
router.get('/fortunes/management/image',homePageCMSController.getFortunesBusinessManagement);
router.post('/fortunes/management',homePageCMSController.postFortunesBusinessManagement);
router.put('/fortunes/management',homePageCMSController.updateFortunesBusinessManagement);
router.delete('/fortunes/management/:_id',homePageCMSController.deleteFortunesBusinessManagement);
router.post('/fortunes/management/image',homePageCMSController.postFortunesBusinessManagementImage);
router.get('/fortunes/management/list',homePageCMSController.getFortunesBusinessManagementData);

//  <----Fortunes Account Management ---->
router.get('/fortunes/account',homePageCMSController.getFortunesBusinessAccount);
router.get('/fortunes/account/image',homePageCMSController.getFortunesBusinessAccount);
router.post('/fortunes/account',homePageCMSController.postFortunesBusinessAccount);
router.put('/fortunes/account',homePageCMSController.updateFortunesBusinessAccount);
router.delete('/fortunes/account/:_id',homePageCMSController.deleteFortunesBusinessAccount);
router.post('/fortunes/account/image',homePageCMSController.postFortunesBusinessAccountImage);
router.get('/fortunes/account/list',homePageCMSController.getFortunesBusinessAccountData);

// <---- Committee Members ---->
router.post('/fortunes/committee',aboutPageCMSController.addNewMember);
router.get('/fortunes/committee',aboutPageCMSController.getCommitteeMemberList);


// <-------Contact Page -------->
router.post('/fortunes/contact/house',contactPageCMSController.addHouseInfo);
router.post('/fortunes/contact/phone',contactPageCMSController.addPhoneInfo);
router.post('/fortunes/contact/website',contactPageCMSController.addWebsiteInfo);
router.post('/fortunes/contact/email',contactPageCMSController.addEmailInfo);
router.post('/fortunes/contact/image',contactPageCMSController.addContactSectionImage);
router.get('/fortunes/contact',contactPageCMSController.getContactInformation);


// <--------Policy Page - Profit ---->
router.post('/fortunes/policy/profit',policyPageCMSController.postProfitAcceptanceContent);
router.get('/fortunes/policy/profit',policyPageCMSController.getProfitAcceptanceContentList);
router.put('/fortunes/policy/profit',policyPageCMSController.updateProfitAcceptanceContentList);
router.delete('/fortunes/policy/profit/:_id',policyPageCMSController.deleteSpecificProficAcceptanceContent);

// <--------Policy Page - Membership ---->
router.post('/fortunes/policy/membership/content',policyPageCMSController.postMembershipRuleContent);
router.post('/fortunes/policy/membership/header',policyPageCMSController.postMembershipRuleHeader);
router.post('/fortunes/policy/membership/warning',policyPageCMSController.postMembershipWarningNote);
router.get('/fortunes/policy/membership/content',policyPageCMSController.getMembershipAndRuleContentArray);
router.get('/fortunes/policy/membership',policyPageCMSController.getMembershipAndRuleContentList);
router.put('/fortunes/policy/membership',policyPageCMSController.updateProfitMembershipRuleContent);
router.delete('/fortunes/policy/membership/:_id',policyPageCMSController.deleteSpecificMembershipAndRuleContent);

// <--------Policy Page - Member Section ---->
router.post('/fortunes/policy/member',policyPageCMSController.postMemberSectionContent);
router.get('/fortunes/policy/member',policyPageCMSController.getMemberSectionContentList);
router.put('/fortunes/policy/member',policyPageCMSController.updateProfitMemberContent);
router.delete('/fortunes/policy/member/:_id',policyPageCMSController.deleteSpecificMemberSectionContent);

module.exports = router;