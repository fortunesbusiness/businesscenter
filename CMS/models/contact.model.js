const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    house: {
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    image: {
        type: String
    },
    website:{
        type: String
    }
});
module.exports = mongoose.model('Contact',ContactSchema);
