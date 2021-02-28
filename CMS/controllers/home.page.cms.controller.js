const FortunesTitle = require('../models/home.page.fortunes.title');
const FortunesGoal = require('../models/home.page.fortunes.goal');
const Management = require('../models/home.page.fortunes.management');
const Ownership = require('../models/home.page.fortunes.ownership');
const Account = require('../models/home.page.account.management');


const multer = require('multer');
//method to delete directory
const {deleteUploadDirectory} = require('../../Utility/delete.directory');


//cloudinary integration
const cloudinary = require('cloudinary').v2;

//method to post fortunes business center title
module.exports.postFortunesBusinessTitle = async(req,res)=>{
    const {content} = req.body;
    // console.log(req.body);
    // res.status(200).send({message: 'Done'});
    const fortunesTitle = new FortunesTitle();

    fortunesTitle.content = content;

    try{
        await fortunesTitle.save();
        res.status(200).send({message: 'Fortunes business tittle succefully uploaded!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to post fortunes business title section image
module.exports.postFortunesBusinessTitleImage = async(req,res)=>{
    const upload = multer({
        dest: 'uploads'
    }).single("fortunes_business_title");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/home/title/${req.file.filename}`
        })
        .then(async (response)=>{
                const {url} = response;
                
                const fortunesBusinessTitle = new FortunesTitle();
                fortunesBusinessTitle.image = url;
    
                try {
                    await fortunesBusinessTitle.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `Business Title Image Has Been Uploaded!`
                    });
                } catch (error) {
                    res.status(400).send({
                        message: `Something went wrong`
                    });
                    // console.log(error);
                }
            // }
        })
    })
}
//method to update a specific fortunes business title
module.exports.updateFortunesBusinessTitle = async(req,res)=>{
    // console.log(req.body);
    const {_id,content} = req.body;
    const fortunesTitle = await FortunesTitle.findOne({_id});
    fortunesTitle.content = content;

    try{
        await fortunesTitle.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to delete a specific fortunes business title
module.exports.deleteFortunesBusinessTitle = async(req,res)=>{
    const {_id} = req.params;
    try{
        await FortunesTitle.findOneAndRemove({_id});
        res.status(200).send({message: 'Content Succesfully deleted!'});
    }
    catch(error){
        res.status(400).send({message: 'There was some problem! Please try again'});
    }
}

//method to get fortunes business title 
module.exports.getFortunesBusinessTitle = async(req,res)=>{
    const fortunesBusinessTitle = await FortunesTitle.find().select({'content':1});
    res.send(fortunesBusinessTitle); 
}
//method to get data for fortunes business title
module.exports.getFortunesBusinessTitleData = async(req,res)=>{
    const content = await FortunesTitle.find().select({'content': 1});
    const titleImage = await FortunesTitle.find().select({'image': 1}).sort({'image': -1}).limit(1);
    const result = {
        content: content,
        image: titleImage
    }
    res.status(200).send(result);
}

// <---------------------- business goal ----------------->

 //method to post fortunes business center goal
module.exports.postFortunesBusinessGoal = async(req,res)=>{
    const {content} = req.body;
    // console.log(req.body);
    // res.status(200).send({message: 'Done'});
    const fortunesGoal = new FortunesGoal();

    fortunesGoal.content = content;

    try{
        await fortunesGoal.save();
        res.status(200).send({message: 'Fortunes business tittle succefully uploaded!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to post fortunes business goal section image
module.exports.postFortunesBusinessGoalImage = async(req,res)=>{
    const upload = multer({
        dest: 'uploads'
    }).single("fortunes_business_goal");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/home/goal/${req.file.filename}`
        })
        .then(async (response)=>{
                const {url} = response;
                
                const fortunesBusinessGoal = new FortunesGoal();
                fortunesBusinessGoal.image = url;
    
                try {
                    await fortunesBusinessGoal.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `Business Center Goal Section Image Has Been Uploaded!`
                    });
                } catch (error) {
                    res.status(400).send({
                        message: `Something went wrong`
                    });
                    // console.log(error);
                }
            // }
        })
    })
}
//method to update a specific fortunes business goal
module.exports.updateFortunesBusinessGoal = async(req,res)=>{
    // console.log(req.body);
    const {_id,content} = req.body;
    const fortunesGoal = await FortunesGoal.findOne({_id});
    fortunesGoal.content = content;

    try{
        await fortunesGoal.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to delete a specific fortunes business goal
module.exports.deleteFortunesBusinessGoal = async(req,res)=>{
    const {_id} = req.params;
    try{
        await FortunesGoal.findOneAndRemove({_id});
        res.status(200).send({message: 'Content Succesfully deleted!'});
    }
    catch(error){
        res.status(400).send({message: 'There was some problem! Please try again'});
    }
}

//method to get fortunes business goal 
module.exports.getFortunesBusinessGoal = async(req,res)=>{
    const fortunesBusinessGoal = await FortunesGoal.find().select({'content':1});
    res.send(fortunesBusinessGoal); 
}
//method to get data for fortunes business goal
module.exports.getFortunesBusinessGoalData = async(req,res)=>{
    const content = await FortunesGoal.find().select({'content': 1});
    const goalImage = await FortunesGoal.find().select({'image': 1}).sort({'image': -1}).limit(1);
    let result;
    (!content && !goalImage)? result = {content: '',image: ''}
    : result = {content: content,image: goalImage};
    // console.log(content);
    // result = {
    //     content: content,
    //     image: goalImage
    // }
    res.status(200).send(result);
}


// <---------------------- business ownership ----------------->

 //method to post fortunes business center ownership
 module.exports.postFortunesBusinessOwnership = async(req,res)=>{
    const {content} = req.body;
    // console.log(req.body);
    // res.status(200).send({message: 'Done'});
    const fortunesOwnership = new Ownership();

    fortunesOwnership.content = content;

    try{
        await fortunesOwnership.save();
        res.status(200).send({message: 'Fortunes business tittle succefully uploaded!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to post fortunes business ownership section image
module.exports.postFortunesBusinessOwnershipImage = async(req,res)=>{
    const upload = multer({
        dest: 'uploads'
    }).single("fortunes_business_ownership");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/home/ownership/${req.file.filename}`
        })
        .then(async (response)=>{
                const {url} = response;
                
                const fortunesBusinessOwnership = new Ownership();
                fortunesBusinessOwnership.image = url;
    
                try {
                    await fortunesBusinessOwnership.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `Business Center Goal Section Image Has Been Uploaded!`
                    });
                } catch (error) {
                    res.status(400).send({
                        message: `Something went wrong`
                    });
                    // console.log(error);
                }
            // }
        })
    })
}
//method to update a specific fortunes business ownership
module.exports.updateFortunesBusinessOwnership = async(req,res)=>{
    // console.log(req.body);
    const {_id,content} = req.body;
    const fortunesOwnership = await Ownership.findOne({_id});
    fortunesOwnership.content = content;

    try{
        await fortunesOwnership.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to delete a specific fortunes business ownership
module.exports.deleteFortunesBusinessOwnership = async(req,res)=>{
    const {_id} = req.params;
    try{
        await Ownership.findOneAndRemove({_id});
        res.status(200).send({message: 'Content Succesfully deleted!'});
    }
    catch(error){
        res.status(400).send({message: 'There was some problem! Please try again'});
    }
}

//method to get fortunes business ownership 
module.exports.getFortunesBusinessOwnership = async(req,res)=>{
    const fortunesBusinessOwnership = await Ownership.find().select({'content':1});
    res.send(fortunesBusinessOwnership); 
}
//method to get data for fortunes business ownership
module.exports.getFortunesBusinessOwnershipData = async(req,res)=>{
    const content = await Ownership.find().select({'content': 1});
    const ownershipImage = await Ownership.find().select({'image': 1}).sort({'image': -1}).limit(1);
    const result = {
        content: content,
        image: ownershipImage
    }
    res.status(200).send(result);
}

// <---------------------- business management ----------------->

 //method to post fortunes business center management
 module.exports.postFortunesBusinessManagement = async(req,res)=>{
    const {content} = req.body;
    // console.log(req.body);
    // res.status(200).send({message: 'Done'});
    const fortunesManagement = new Management();

    fortunesManagement.content = content;

    try{
        await fortunesManagement.save();
        res.status(200).send({message: 'Fortunes business tittle succefully uploaded!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to post fortunes business management section image
module.exports.postFortunesBusinessManagementImage = async(req,res)=>{
    const upload = multer({
        dest: 'uploads'
    }).single("fortunes_business_management");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/home/management/${req.file.filename}`
        })
        .then(async (response)=>{
                const {url} = response;
                
                const fortunesBusinessManagement = new Management();
                fortunesBusinessManagement.image = url;
    
                try {
                    await fortunesBusinessManagement.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `Business Center Goal Section Image Has Been Uploaded!`
                    });
                } catch (error) {
                    res.status(400).send({
                        message: `Something went wrong`
                    });
                    // console.log(error);
                }
            // }
        })
    })
}
//method to update a specific fortunes business management
module.exports.updateFortunesBusinessManagement = async(req,res)=>{
    // console.log(req.body);
    const {_id,content} = req.body;
    const fortunesManagement = await Management.findOne({_id});
    fortunesManagement.content = content;

    try{
        await fortunesManagement.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to delete a specific fortunes business management
module.exports.deleteFortunesBusinessManagement = async(req,res)=>{
    const {_id} = req.params;
    try{
        await Management.findOneAndRemove({_id});
        res.status(200).send({message: 'Content Succesfully deleted!'});
    }
    catch(error){
        res.status(400).send({message: 'There was some problem! Please try again'});
    }
}

//method to get fortunes business management 
module.exports.getFortunesBusinessManagement = async(req,res)=>{
    const fortunesBusinessManagement = await Management.find().select({'content':1});
    res.send(fortunesBusinessManagement); 
}
//method to get data for fortunes business management
module.exports.getFortunesBusinessManagementData = async(req,res)=>{
    const content = await Management.find().select({'content': 1});
    const managementImage = await Management.find().select({'image': 1}).sort({'image': -1}).limit(1);
    const result = {
        content: content,
        image: managementImage
    }
    res.status(200).send(result);
}

// <---------------------- business Account management ----------------->

 //method to post fortunes business center Account management
 module.exports.postFortunesBusinessAccount = async(req,res)=>{
    const {content} = req.body;
    // console.log(req.body);
    // res.status(200).send({message: 'Done'});
    const fortunesAccount = new Account();

    fortunesAccount.content = content;

    try{
        await fortunesAccount.save();
        res.status(200).send({message: 'Fortunes business tittle succefully uploaded!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to post fortunes business Account management section image
module.exports.postFortunesBusinessAccountImage = async(req,res)=>{
    const upload = multer({
        dest: 'uploads'
    }).single("fortunes_business_account");
    upload(req, res, (error) => {
        if (error) return res.status(400).send({
            message: "Something went wrong"
        });

        // console.log(req.file);
        cloudinary.uploader.upload(req.file.path, {
            public_id: `fortunes-somiti/home/account/${req.file.filename}`
        })
        .then(async (response)=>{
                const {url} = response;
                
                const fortunesBusinessAccount = new Account();
                fortunesBusinessAccount.image = url;
    
                try {
                    await fortunesBusinessAccount.save();
                    await deleteUploadDirectory();
                    res.status(200).send({
                        message: `Business Center Goal Section Image Has Been Uploaded!`
                    });
                } catch (error) {
                    res.status(400).send({
                        message: `Something went wrong`
                    });
                    // console.log(error);
                }
            // }
        })
    })
}
//method to update a specific fortunes business Account management
module.exports.updateFortunesBusinessAccount = async(req,res)=>{
    // console.log(req.body);
    const {_id,content} = req.body;
    const fortunesAccount = await Account.findOne({_id});
    fortunesAccount.content = content;

    try{
        await fortunesAccount.save();
        res.status(200).send({message: 'Updated succesfully!'});
    }
    catch(error){
        res.status(400).send({message: 'Something went wrong!'});
    }
}

//method to delete a specific fortunes business Account management
module.exports.deleteFortunesBusinessAccount = async(req,res)=>{
    const {_id} = req.params;
    try{
        await Account.findOneAndRemove({_id});
        res.status(200).send({message: 'Content Succesfully deleted!'});
    }
    catch(error){
        res.status(400).send({message: 'There was some problem! Please try again'});
    }
}

//method to get fortunes business Account management 
module.exports.getFortunesBusinessAccount = async(req,res)=>{
    const fortunesBusinessAccount = await Account.find().select({'content':1});
    res.send(fortunesBusinessAccount); 
}

//method to get data for fortunes business Account management
module.exports.getFortunesBusinessAccountData = async(req,res)=>{
    const content = await Account.find().select({'content': 1});
    const accountImage = await Account.find().select({'image': 1}).sort({'image': -1}).limit(1);
    const result = {
        content: content,
        image: accountImage
    }
    res.status(200).send(result);
}
