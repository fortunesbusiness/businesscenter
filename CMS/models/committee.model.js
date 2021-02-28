const mongoose = require('mongoose');

const CommitteeMember = mongoose.Schema({
    name: {
        type: String
    },
    company:{
        type: String
    },
    position:{
        type: String
    },
    type: {
        type: String
    },
    image:{
        type: String
    },
    linkedIn:{
        type: String
    },
    facebook:{
        type: String
    }
});
module.exports = mongoose.model('Committee',CommitteeMember);
