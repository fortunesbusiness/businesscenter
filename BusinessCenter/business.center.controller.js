const BusinessCenter = require('../BusinessCenter/business.center.model');



//method to get all share information 
module.exports.businessCenterShareAndDepositInformation = async(req,res)=>{
    const businessCenter = await BusinessCenter.findOne({_id: "6042f1e6b5e92405ccb4b95c"});
    // console.log(businessCenter);
    const result = {
        totalPremiumShare: businessCenter.total_premium_share,
        totalPremiumShareSold: businessCenter.total_premium_share_sold,
        totalPremiumShareRemaining: Number(businessCenter.total_premium_share) - Number(businessCenter.total_premium_share_sold),
        totalGeneralShare: businessCenter.total_general_share,
        totalGeneralShareSold: businessCenter.total_general_share_sold,
        totalGeneralShareRemaining: Number(businessCenter.total_general_share) - Number(businessCenter.total_general_share_sold),
        totalDepositAmount: businessCenter.total_deposit,
        totalExpense : businessCenter.expense
    }
    res.status(200).send(result);
}

//method to post business center expenses 
module.exports.addExpense = async(req,res)=>{
    const {expense} = req.body;
    const businessCenter = await BusinessCenter.findOne({_id: "6042f1e6b5e92405ccb4b95c"});
    // console.log(businessCenter);
    businessCenter.expense = Number(businessCenter.expense) + Number(expense);

    try{
        await businessCenter.save();
        res.status(200).send({message: 'Expense Succesfully Added!'});
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: 'Sorry! Something went wrong please try again!'});
    }
}