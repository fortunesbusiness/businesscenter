const mongoose = require('mongoose');

const HomePageFortunesManagementSchema = mongoose.Schema({
    content: {
        type: String
    },
    image:{
        type: String
    }
});
module.exports = mongoose.model('FortunesManagement',HomePageFortunesManagementSchema);
