const Advice = require('./advice.model');
const User = require('../User/user.model');

//method to post advice
module.exports.postAdvice = async(req,res)=>{
    const {_id} = req.user;
    const {advice} = req.body;

    const user = await User.findOne({_id});
    const adviceObj = new Advice();
    adviceObj.advice = advice;
    adviceObj.name =  user.name;

    try{
        await adviceObj.save();
        res.status(200).send({message: 'Thank you for you advice!'});
    }
    catch(error){
        res.status(400).send({message: 'Sorry! Something occured, please try again'});
    }
}

//method to get advice list
module.exports.getAdviceList = async(req,res)=>{
    const adviceList = await Advice.find().sort({_id: -1});
    // console.log(adviceList);
    res.status(200).send(adviceList);
}
//method to delete specific advice
module.exports.deleteAdvice = async(req,res)=>{
    const {_id} = req.body;

    try{
        await Advice.findOneAndRemove({_id});
        res.status(200).send({message: 'Selected Advice Deleted!'});
    }
    catch(error){
        res.status(400).send({message: 'Internal Server Error!'});
    }
}