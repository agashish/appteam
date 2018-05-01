const mongoose = require('mongoose')
const moment = require('moment')

const notesSchema = mongoose.Schema({
    task_id : {
        require: true,
        type: String
    },
    notes: {
        require: true,
        type: String,
        maxlength: 100,
        minlength: 25
    },
    status:{
        type: Number,
        default: 0
    },
    isDeleted: {
        default: 0,
        type: Number
    }
})

const Notes = mongoose.model('Notes' , notesSchema)

module.exports = {Notes}