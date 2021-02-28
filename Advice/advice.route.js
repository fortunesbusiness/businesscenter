const express = require('express');
const router = express.Router();

const {verifyUser,verifyAdmin} = require('../middleware/verify.token');
const adviceController = require('./advice.controller');

//route for user routes
router.post('/post',verifyUser,adviceController.postAdvice);
router.get('/list',verifyAdmin,adviceController.getAdviceList);
router.post('/delete',verifyAdmin,adviceController.deleteAdvice);
module.exports = router;