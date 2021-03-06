const BusinessCenter = require('../BusinessCenter/business.center.model');



//method to get all share information 
module.exports.businessCenterShareAndDepositInformation = async(req,res)=>{
    const businessCenter = await BusinessCenter.findOne({_id: "60436f82b650c1d538a63db0"});
    // console.log(businessCenter);
    const result = {
        totalPremiumShare: businessCenter.total_premium_share,
        totalPremiumShareSold: businessCenter.total_premium_share_sold,
        totalPremiumShareRemaining: Number(businessCenter.total_premium_share) - Number(businessCenter.total_premium_share_sold),
        totalGeneralShare: businessCenter.total_general_share,
        totalGeneralShareSold: businessCenter.total_general_share_sold,
        totalGeneralShareRemaining: Number(businessCenter.total_general_share) - Number(businessCenter.total_general_share_sold),
        totalDepositAmount: businessCenter.total_deposit
    }
    res.status(200).send(result);
}
