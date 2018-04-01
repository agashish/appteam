const {User} = require('./../../models/users')

let auth = ( req, res, next ) => {
    
    let token = req.cookies.auth_my_team
    
    User.findByToken(token, (err, user) => {
        if(err) throw err
        req.user = user
        next()
    })
    
}

module.exports = {auth}