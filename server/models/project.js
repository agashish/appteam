const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    status: {
        type: Number,
        require: true,
        trim: true,
        default: 1
    }
})

projectSchema.statics.projectList = function (cb) {
    const project = this
    project.find({'status':1}).exec((err, list) => {
        if(err){
            return cb(err)
        }
        return cb(null, list)
    })
}

const Project = mongoose.model('Project' , projectSchema)

module.exports = {Project}