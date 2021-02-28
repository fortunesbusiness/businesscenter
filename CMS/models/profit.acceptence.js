const mongoose = require('mongoose');

const ProfitSchema = mongoose.Schema({
    content: {
        type: String
    }
});
module.exports = mongoose.model('Profit',ProfitSchema);
