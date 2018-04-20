const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    category_name: {
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

categorySchema.statics.categoryList = function (cb) {
    const category = this
    category.find({'status':1}).exec((err, list) => {
        if(err){
            return cb(err)
        }
        return cb(null, list)
    })
}

const Category = mongoose.model('Category' , categorySchema)

module.exports = {Category}