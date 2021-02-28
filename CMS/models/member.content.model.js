const mongoose = require('mongoose');

const MemberContent = mongoose.Schema({
    content: {
        type: String
    },
    member_type:{
        type: String
    }
});
module.exports = mongoose.model('Member',MemberContent);
