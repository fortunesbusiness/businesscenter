const mongoose = require('mongoose');

const HomePageFortunesOwnershipSchema = mongoose.Schema({
    content: {
        type: String
    },
    image:{
        type: String
    }
});
module.exports = mongoose.model('FortunesOwnership',HomePageFortunesOwnershipSchema);
