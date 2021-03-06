const mongoose = require('mongoose');

const BusinessCenterSchema = mongoose.Schema({
    total_premium_share:{
        type: Number
    },
    total_premium_share_sold:{
        type: Number
    },
    total_general_share_sold:{
        type: Number
    },
    total_general_share:{
        type: Number
    },
    total_deposit:{
        type: Number
    }
    
});
module.exports = mongoose.model('BusinessCenter',BusinessCenterSchema);
