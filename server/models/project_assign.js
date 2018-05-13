const mongoose = require('mongoose')
const moment = require('moment')

const assignProjectSchema = mongoose.Schema({
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
    project: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
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
    }
})

//#### MODEL PREPARATION
const AssignProject = mongoose.model('AssignProject', assignProjectSchema)


//#### EXPORTING
module.exports = {AssignProject}