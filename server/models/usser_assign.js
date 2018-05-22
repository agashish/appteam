const mongoose = require('mongoose')
const moment = require('moment')

const assignUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { //assign user id
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    task: { // task id
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    user_id: {
        require: true,
        type: String   
    },
    created_date: {
        type: String,
        default: moment().format('DD/MM/YYYY')
    },
    created_date_time: {
        type: String,
        default: moment().format('DD/MM/YYYY h:mm:ss a')
    },
    created_time: {
        type: String,
        default: moment().format('h:mm:ss a')
    },
    is_deleted:{
        type: Number,
        default: '0'
    }
})

//#### MODEL PREPARATION
const AssignUser = mongoose.model('AssignUser', assignUserSchema)

//#### EXPORTING
module.exports = {AssignUser}