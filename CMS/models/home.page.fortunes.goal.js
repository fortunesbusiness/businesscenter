const mongoose = require('mongoose');

const HomePageFortunesGoalSchema = mongoose.Schema({
    content: {
        type: String
    },
    image:{
        type: String
    }
});
module.exports = mongoose.model('FortunesGoal',HomePageFortunesGoalSchema);
