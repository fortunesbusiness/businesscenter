const Investment = require('./investment.model');

//method to get investment record
module.exports.getInvestmentRecord = async(req,res)=>{
    const investmentList = await Investment.findOne({id: 'businessCenter22'});
    // console.log(investmentList);
    res.status(200).send(investmentList);
}