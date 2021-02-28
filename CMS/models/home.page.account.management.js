const mongoose = require('mongoose');

const HomePageFortunesAccountSchema = mongoose.Schema({
    content: {
        type: String
    },
    image:{
        type: String
    }
});
module.exports = mongoose.model('FortunesAccount',HomePageFortunesAccountSchema);
