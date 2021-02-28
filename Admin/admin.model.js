const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 20
    }
    
});
module.exports = mongoose.model('Admin',AdminSchema);
