const express = require('express');
const app = new express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
//calling dotenv 
dotenv.config();

//getting port number from env or setting port number
const PORT = process.env.PORT || 3000;

//importing routes for api endpoints
const userRouter = require('./User/user.route');
const adminRouter = require('./Admin/admin.route');
const paymentRouter = require('./Payment/payment.route');
const cmsRouter = require('./CMS/cms.route');
const investmentRouter = require('./Investment/investment.route');
const adviceRouter = require('./Advice/advice.route');
const businessCenterRouter = require('./BusinessCenter/business.center.route');

//connect database
const DB_URI = process.env.DB_URI;
// console.log(DB_URI);
mongoose.connect(DB_URI,()=>{
    console.log(`Connected to database`);
});

//cloudinary configuration
//cloudinary configuration
cloudinary.config({ 
    cloud_name: 'dbefofzqn', 
    api_key: '685581139743957', 
    api_secret: 'KZMOdAMwbuNw6pOJHrDq_nsig4Y' 
});

//initialize helper libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//setting api endpoints
app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/cms',cmsRouter);
app.use('/api/investment',investmentRouter);
app.use('/api/advice',adviceRouter);
app.use('/api/businesscenter',businessCenterRouter);

//starting the application
app.listen(PORT,()=>{
    console.log(`Listening to port: ${PORT}`);
});
