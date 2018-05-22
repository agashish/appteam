const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./../config/config').get(process.env.NODE_ENV)
const SALT_I = 10
const userSchema = mongoose.Schema({
    team_id: {
        type: String,
        default: '0'
    },
    firstname: {
        type: String,
        require: true,
        trim: true
    },
    lastname: {
        type: String,
        //require: true,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        maxlength: 25,
        unique: 1
    },
    phonenumber: {
        type: Number,
        //require: true,
        trim: true,
        maxlength: 10,
        
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    role: {
        type: Number,
        default: 2
    },
    token: {
        type: String
    },
    _id: mongoose.Schema.Types.ObjectId,
    status: {
        type: Number,
        default: 0
    }
})

//#### NEW MIDDLEWARE FOR SAVING AND CREATING HASH FOR GIVEN PASSWORD
userSchema.pre('save', function(next) {

    let user = this

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I , (err, salt) => {
            if(err) return next(err)

            bcrypt.hash(user.password , salt , (err, hash) => {
                if(err) return next(err)

                user.password = hash
                next()
            })
        })            
    } else {
        next()
    }
})

//#### GENERATE THE WEB TOKEN
userSchema.methods.generateToken = function(cb) {

    var user = this
    const token = jwt.sign(user._id.toHexString() , config.SECRET)

    user.token = token
    user.save((err, user) => {
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function(token , cb) {
    var user = this

    //verify the token by jsonwebtoken module
    jwt.verify(token, config.SECRET, (err , decodeToken) => {
        
        user.findOne({_id: decodeToken, token: token} , (err, user) => {

            if(err) return cb(err)
            return cb(null, user)

        })

    })

}

userSchema.methods.deleteToken = function (token, cb) {

    let user = this

    user.update({
        $unset: {
            token: 1
        }
    }, (err, user) => {
        if(err) return cb(err)
        return cb(null , user)
    })
}


userSchema.methods.comparePassword = function (textPassword , cb) {

    var user = this
    bcrypt.compare(textPassword , user.password , (err , isMatch) => {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.statics.getTeamList = function(reqUser , cb) {
    var user = this
    user.find().exec((err, user) => {
        if(err){
            return cb(err)
        }
        return cb(null, user)
    })
}

userSchema.statics.getUserList = function(cb) {
    var user = this
    user.find().exec((err, user) => {
        if(err){
            return cb(err)
        }
        return cb(null, user)
    })
}


userSchema.statics.getAssignUserList = function(taskId , cb) {
    var user = this

    const {AssignUser} = require('./usser_assign')

    AssignUser.find({task: taskId}).select({"user": 1, "_id": 0}).exec((err, users) =>{

        if(err){
            return cb(err)
        }

        //conversion
        userList = users.map(function(doc) { return doc.user; });

        //#### FIND REST NON ASSIGN USER
        user.find().where('_id').nin(userList).exec((err, user) => {

            if(err){
                return cb(err)
            }
            return cb(null, user)
        })
    })
}   

//#### CREATE MODEL CONSTRUCTOR
const User = mongoose.model('User', userSchema)

module.exports = {User}