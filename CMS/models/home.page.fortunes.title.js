const mongoose = require('mongoose');

const HomePageFortunesTitleSchema = mongoose.Schema({
    content: {
        type: String
    },
    image:{
        type: String
    }
});
module.exports = mongoose.model('FortunesTitle',HomePageFortunesTitleSchema);
