const mongoose = require('mongoose');

const MembershipUpgradeSchema = mongoose.Schema({
    user_id:{
        type: String
    },
    requestedMembership:{
        type: String
    },
    is_approved:{
        type: Boolean
    }
    
});
module.exports = mongoose.model('MembershipUpgradge',MembershipUpgradeSchema);
