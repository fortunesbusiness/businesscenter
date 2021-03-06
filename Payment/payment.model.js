const { bool } = require('@hapi/joi');
const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
    recipt_or_transaction_id_image:{
        type: String
    },
    amount:{
        type: Number
    },
    fortunes_business_id:{
        type: String
    },
    is_approved:{
        type: Boolean
    },
    bank_recipt_number_bkash_or_rocket_transaction_id:{
        type: String
    },
    payment_type:{
        type: String
    },
    bank_name:{
        type: String
    }
});

module.exports = mongoose.model('Payment',PaymentSchema);