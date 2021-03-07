const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nid_number:{
        type: Number,
        required: true,
        min: 6
    },
    nid_image:{
        type: String
    },
    name:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    father_name:{
        type: String,
        min: 6,
        max: 20
    },
    mother_name:{
        type: String,
        min: 6,
        max: 20
    },
    spouse_name:{
        type: String,
        min: 6,
        max: 20
    },
    phone_number:{
        type: String,
        min: 11,
        max: 11
    },
    email_address:{
        type: String,
        min: 6,
        max: 20
    },
    date_of_birth:{
        type: String
    },
    member_type:{
        type: String
    },
    present_address:{
        type: String
    },
    permanent_address:{

    },
    fortunes_business_id:{
        type: String
    },
    image:{
        type: String
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    total_deposited_amount:{
        type: Number
    },
    payment_status:[
        {
            month_name: {
                type: String
            },
            amount:{
                type: Number
            },
            year:{
                type: String
            },
            total_deposit_amount:{
                type: Number
            },
            bank_name:{
                type: String
            },
            due_amount:{
                type: Number
            },
            payment_date:{
                type: String
            }
        }
    ],
    profit:[
        {
            month_name: {
                type: String
            },
            amount:{
                type: Number
            },
            year:{
                type: String
            },
            percentage:{
                type: Number
            },
            total_profit_amount:{
                type: Number
            }
        }
    ],
    total_profit:{
        type: Number
    },
    is_approved:{
        type: Boolean
    },
    reference:{
        type: String
    },
    investment:[
        {
            area: {
                type: String
            },
            amount: {
                type: Number
            },
            month: {
                type: String
            },
            year: {
                type: String
            }
        }
    ],
    total_invested_amount:{
        type: Number
    },
    nominee:[
        {
            name:{
                type: String
            },
            relationship:{
                type: String
            },
            nid:{
                type: String
            },
            nid_image: {
                type: String
            },
            image:{
                type: String
            },
            mobile_number:{
                type: String
            }
        }
    ],
    food_investment_amount :{
        type: Number
    },
    health_investment_amount :{
        type: Number
    },
    education_investment_amount :{
        type: Number
    },
    vehicle_investment_amount :{
        type: Number
    },
    garments_investment_amount :{
        type: Number
    },
    residence_investment_amount :{
        type: Number
    },
    total_share:{
        type: Number
    },
    due_amount: {
        type: Number
    }
    
});
module.exports = mongoose.model('User',UserSchema);
