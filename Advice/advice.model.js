const mongoose = require('mongoose');

const AdviceSchema = mongoose.Schema({
    advice:{
        type: String
    },
    name:{
        type: String
    }
    
});
module.exports = mongoose.model('Advice',AdviceSchema);
