const Investment = require('./investment.model');


const getInvestment = async()=>{
    const investment = await Investment.findOne({id: 'businessCenter22'});
    return investment;
}
//method to get investment record
module.exports.getInvestmentRecord = async(req,res)=>{
    const investmentList = await getInvestment();
    res.status(200).send(investmentList);
}

//method to update total investment amount
module.exports.updateTotalInvestmentAmount = async(req,res)=>{
    const investment = await getInvestment();
    investment.totalInvestment = Number(req.body.totalInvestmentAmount);
    try{
        await investment.save();
        res.status(200).send({message: 'Total investment amount updated!'});
    }
    catch(error){
        res.status(500).send({message: "Internal Server Error!"});
    }
    
}

//method to update food investment amount
module.exports.updateFoodInvestmentAmount = async(req,res)=>{
    const investment = await getInvestment();
    investment.foodInvestmentAmount = Number(req.body.foodInvestmentAmount);
    try{
        await investment.save();
        res.status(200).send({message: 'Food investment amount updated!'});
    }
    catch(error){
        res.status(500).send({message: "Internal Server Error!"});
    }
    
}

//method to update health investment amount
module.exports.updateHealthInvestmentAmount = async(req,res)=>{
    const investment = await getInvestment();
    investment.healthInvestmentAmount = Number(req.body.healthInvestmentAmount);
    try{
        await investment.save();
        res.status(200).send({message: 'Health investment amount updated!'});
    }
    catch(error){
        res.status(500).send({message: "Internal Server Error!"});
    }
    
}

//method to update vehicle investment amount
module.exports.updateVehicleInvestmentAmount = async(req,res)=>{
    const investment = await getInvestment();
    investment.vehicleInvestmentAmount = Number(req.body.vehicleInvestmentAmount);
    try{
        await investment.save();
        res.status(200).send({message: 'Vehicle investment amount updated!'});
    }
    catch(error){
        res.status(500).send({message: "Internal Server Error!"});
    }
}

//method to update cloths investment amount
module.exports.updateClothsInvestmentAmount = async(req,res)=>{
    const investment = await getInvestment();
    investment.garmentsInvestmentAmount = Number(req.body.garmentsInvestmentAmount);
    try{
        await investment.save();
        res.status(200).send({message: 'Cloths investment amount updated!'});
    }
    catch(error){
        res.status(500).send({message: "Internal Server Error!"});
    }
}
//method to update education investment amount
module.exports.updateEducationInvestmentAmount = async(req,res)=>{
    const investment = await getInvestment();
    investment.educationInvestmentAmount = Number(req.body.educationInvestmentAmount);
    try{
        await investment.save();
        res.status(200).send({message: 'Education investment amount updated!'});
    }
    catch(error){
        res.status(500).send({message: "Internal Server Error!"});
    }
}

//method to update residence investment amount
module.exports.updateResidenceInvestmentAmount = async(req,res)=>{
    const investment = await getInvestment();
    investment.residenceInvestmentAmount = Number(req.body.residenceInvestmentAmount);
    try{
        await investment.save();
        res.status(200).send({message: 'Residence investment amount updated!'});
    }
    catch(error){
        res.status(500).send({message: "Internal Server Error!"});
    }
}
