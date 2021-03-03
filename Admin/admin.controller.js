const Admin = require('./admin.model');
const {hashPassword,comparePassword} = require('../Utility/hash.password');
const jwt = require('jsonwebtoken');
const User = require('../User/user.model');


module.exports.createAdmin = async(req,res)=>{
    //destruct admin objects
    const {username,password} = req.body;

    //hash admin password
    const hashedPassword = await hashPassword(password);

    //create admin object
    const admin = new Admin();

    admin.username = username;
    admin.password = hashedPassword;

    try{
        await admin.save();
        res.status(200).send({message: 'Admin Created'});
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: 'Some Error occured'});
    }
}

//method to login as admin
module.exports.adminLogin = async(req,res)=>{
    const {username,password} = req.body;

    //check if username is correct
    const admin = await Admin.findOne({username});
    if(!admin) return res.status(400).send({message: 'Sorry! Your credential is wrong'});

    //check if password is correct
    const isPasswordValid = await comparePassword(password,admin.password);
    if(!isPasswordValid) return res.status(400).send({message: 'Sorry! Your credential is wrong'});

    const token = jwt.sign({_id: admin._id},process.env.ADMIN_SECRET_TOKEN);

    res.status(200).send({accessToken: token});
    
}

//method to get admin dashboard results
//method to get requested and registered member list
module.exports.getTotalRequestAndRegisteredmember = async(req,res)=>{
    const userRequest = await User.find({is_approved: false}).count();
    const registeredUser = await User.find({is_approved: true}).count();
    // console.log(userRequest);
    // console.log(registeredUser);
    const result = {
        totalRegisteredUser: registeredUser,
        totalUserRequest: userRequest
    }
    res.status(200).send(result);
}