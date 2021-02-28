const mongoose = require('mongoose');

const InvestmentSchema = mongoose.Schema({
    foodInvestmentAmount:{
        type: Number
    },
    healthInvestmentAmount:{
        type: Number
    },
    educationInvestmentAmount:{
        type: Number
    },
    vehicleInvestmentAmount:{
        type: Number
    },
    garmentsInvestmentAmount:{
        type: Number
    },
    residenceInvestmentAmount:{
        type: Number
    },
    totalInvestment:{
        type: Number
    },
    id:{
        type: String
    }
    
});
module.exports = mongoose.model('Investment',InvestmentSchema);
