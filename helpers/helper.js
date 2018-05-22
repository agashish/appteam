const mongoose = require('mongoose')
const hbsAsync = require('express-hbs')
var async = require('async');
const {AssignUser} = require('./../server/models/usser_assign')

module.exports = {
    if_even: (conditional, options) => {
        if((conditional % 2) == 0) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
    },
    signup: async function (taskId, cb) {
        console.log('hello')
        //return new hbsAsync.SafeString(taskId)
        await AssignUser.find({}).count().then((err, count) => {
            return taskId
        })
    }
}

// Handlebars.registerHelper('if_even', function(conditional, options) {
//     if((conditional % 2) == 0) {
//       return options.fn(this);
//     } else {
//       return options.inverse(this);
//     }
// });