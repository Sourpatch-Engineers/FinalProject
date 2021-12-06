const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    },
    scrumMaster: {
        type: String,
        required: true
    },
    totalMembers: {
        type: Number,
        required: true
    },

    sprints: {
        type: Object
    }
    
})

module.exports = mongoose.model('Team', TeamSchema)