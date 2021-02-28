const mongoose = require('mongoose');

const MembershipRuleSchema = mongoose.Schema({
    content: {
        type: String
    },
    header:{
        type: String
    },
    warning_note:{
        type: String
    }
});
module.exports = mongoose.model('MembershipRule',MembershipRuleSchema);
