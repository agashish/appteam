//#### LOAD MODULES
const express = require('express')
const moment = require('moment')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')

//#### INVOKE DEFAULT PROCESS
const config = require('./config/config').get(process.env.NODE_ENV)

console.log(config.DATABASE)

//#### GET MONGOOSE CONNECTION
mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE , (err) => {
    if(err) {
        throw err
    }
})

//#### READY WEB SERVER
const app = express()

//#### GET THE MIDDLEWARE 
const middleware = require('./middleware/common_middleware/middleware')
const {auth} = require('./middleware/auth/auth')

//#### SET THE MIDDLEWARE
middleware.body_parser(app)
middleware.cookie_parser(app)

//#### SET THE HBS
middleware.express_hbs(app)
middleware.express_engine(app)

//#### SET WEB DEPENDENCIES DEFAULT
middleware.xcss(app)
middleware.xjs(app)
middleware.xlib(app)
middleware.xfont(app)
middleware.ximg(app)

//#### LOAD MODELS
const {User} = require('./models/users')

//#### LOAD GET ROUTE
app.get('/' , auth , (req, res) => {

    if(req.user) return res.redirect('/dashboard')

    res.render('login_view/login' , {
        layout: 'login/login_master'
    })
    
})

app.get('/login' , auth ,(req, res) => {

    if(req.user) return res.redirect('/dashboard')

    res.render('login_view/login' , {
        layout: 'login/login_master'
    })
})

app.get('/register' , auth, (req, res) => {

    if(req.user) return res.redirect('/dashboard')

    res.render('register_view/register' , {
        layout: 'register/register_master'
    })
})

app.get('/dashboard' , auth, (req, res) => {

    console.log(req.user)

    if(!req.user) return res.redirect('/login')
    res.render('dashboard/home' , {
        layout: 'dashboard/dashboard_master',
        user: req.user
    })
})

//#### POST ROUTE
app.post('/api/register' , auth, (req, res) => {
    
    //#### SET USER REGISTER DATA
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        password: req.body.password
    })

    user.save((err, user) => {
        if(err){
            return res.status(400).send(err)
        }        
        user.generateToken((err , user) => {
            if(err) return res.status(400).send(err)
            
            //set into header
            //res.header('key' , 'value').send(user)

            //#### SET COOKIE BECAUSE AFTER REFERSH THE PAGE< COOKIE WILL PERISTSANT INTO  BROWSER
            res.cookie('auth_my_team' , user.token).send('ok')
        })

    })
})

app.get('/dashboard/logout' , auth , (req, res) => {

    if(!req.user) return res.redirect('/login')
    req.user.deleteToken(req.token , (err, user) => {

        if(err) return res.status(400).send(err)

        res.cookie('auth_my_team', '')

        res.redirect('/login')

    })
})

app.post('/api/login' , (req, res) => {

    //#### FIND USER BY EMAIL
    User.findOne({'email':req.body.email}, (err, user) => {

        if(!user){
            return res.status(400).send('Auth failed, user not found in our database')
        }            

        //#### Compare password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) return res.status(400).send(err)
            
            if(!isMatch){
                return res.status(400).json({message: "Password is not matching."})
            }

            //#### GENERATE TOKEN FOR AUTHENTICATION
            user.generateToken((err , user) => {
                if(err) return res.status(400).send(err)
                
                //set into header
                //res.header('key' , 'value').send(user)
    
                //#### SET COOKIE BECAUSE AFTER REFERSH THE PAGE< COOKIE WILL PERISTSANT INTO  BROWSER
                res.cookie('auth_my_team' , user.token).send('ok')
            })
        })
    })
})

//#### LISTENING THE SERVER PORT
app.listen(config.PORT , () => {
    console.log(`Server is running at ${config.PORT}`)
})