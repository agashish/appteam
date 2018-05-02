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
        minlength: 1,
        trim: true
    },
    status:{
        type: Number,
        default: 0
    },
    isDeleted: {
        default: 0,
        type: Number
    },
    date: {
        type: String,
        default: moment().format('DD/MM/YY h:mm:ss a')
    },
    user_id: {
        type: String,
        require: true
    }
})

const Notes = mongoose.model('Notes' , notesSchema)

module.exports = {Notes}