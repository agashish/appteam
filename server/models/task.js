const mongoose = require('mongoose')
const moment = require('moment')

const taskSchema = mongoose.Schema({
    task_name: {
        require: true,
        unique: 1,
        minlength: 1,
        maxlength: 100,
        type: String
    },
    user_id: {
        require: true,
        type: String
    },
    project_id: {
        type: Number,
        default: 0
    },
    task_id: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    is_deleted: {
        type: Number,
        default: 1
    },
    date: {
        type: String,
        default: moment().format('MM/DD/YY h:mm:ss a')
    }
})

taskSchema.statics.getTaskList = function(cb) {

    const task = this
    task.find({status: 1, is_deleted: 1}).exec((err, tasks) => {
        if(err){
            return cb(err)
        }    
        return cb(null, tasks)
    })
}


taskSchema.statics.getTaskDetailById = function(taskId, cb) {
    const task = this

    task.findById({'_id':taskId}).exec((err, detail) => {
        if(err){
            return cb(err)
        }
        return cb(null, detail)
    })
}

const Task = mongoose.model('Task' , taskSchema)

module.exports = {Task}