const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    project_id: {
        type: String,
        default: '0'
    },
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

projectSchema.statics.getAssignProjectList = function(taskId , cb) {
    var project = this

    const {AssignProject} = require('./project_assign')

    AssignProject.find({task: taskId}).select({"project": 1, "_id": 0}).exec((err, projects) =>{

        if(err){
            return cb(err)
        }

        //conversion
        projectList = projects.map(function(doc) { return doc.project; });

        //#### FIND REST NON ASSIGN USER
        project.find({'status':1}).where('_id').nin(projectList).exec((err, prjList) => {

            if(err){
                return cb(err)
            }
            return cb(null, prjList)
        })
    })
} 

const Project = mongoose.model('Project' , projectSchema)

module.exports = {Project}