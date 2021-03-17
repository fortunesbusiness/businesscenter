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
//method to update admin username
module.exports.updateAdminUsername = async(req,res)=>{
    //destruct admin objects
    const {username} = req.body;

    //create admin object
    const admin = await Admin.findOne({_id: '603b78c5a50f0c00157f9c8d'});

    admin.username = username;

    try{
        await admin.save();
        res.status(200).send({message: 'Admin Username Changed!'});
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: 'Some Error occured'});
    }
}

module.exports.updateAdminPassword = async(req,res)=>{
    //destruct admin objects
    const {password} = req.body;

    //hash admin password
    const hashedPassword = await hashPassword(password);

    //create admin object
    const admin = await Admin.findOne({_id: '603b78c5a50f0c00157f9c8d'});

    
    admin.password = hashedPassword;

    try{
        await admin.save();
        res.status(200).send({message: 'Admin Password Changed'});
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: 'Some Error occured'});
    }
}
