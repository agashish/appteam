//#### LOAD MODULES
const express = require('express')
const moment = require('moment')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')
const path = require('path')
const partials = require('express-partial')

//#### INVOKE DEFAULT PROCESS
const config = require('./config/config').get(process.env.NODE_ENV)

//console.log(config.DATABASE)

//#### GET MONGOOSE CONNECTION
mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE , (err) => {
    if(err) {
        throw err
    }
})

//#### READY WEB SERVER
const app = express()
app.use(partials())
app.use(express.static(__dirname + '../public'));

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
const  {Category} = require('./models/category')
const {Project} = require('./models/project')
const {Task} = require('./models/task')
const {Notes} = require('./models/notes')

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

    if(!req.user) return res.redirect('/login')

    //#### GET DFAULT DATA FOR DASHBOARD
    //#### GET THE TEAM LIST
    User.getTeamList(req.user , (err, user) => {

        if(err){
            return res.status(400).send(err)                
        }

        if(!user){
            return res.status(400).send(err)
        }
        
        //#### CATEGORY LIST
        Category.categoryList((err, list) => {

            if(err){
                req.category = {}
            }
            req.category = list    
           
            //#### PROJECT LIST
            Project.projectList((err, project) => {

                if(err){
                    req.project = {}
                }
                req.project = project

                //#### SET TASK LISTS DEFAULT INTO MIDDLE
                Task.getTaskList((err, tasks) => {
                    
                    if(err) {
                        res.status(400).send(err)
                    }
                    
                    res.render('dashboard/home' , {
                        layout: 'dashboard/dashboard_master',
                        user: req.user,
                        teams: user,
                        category: req.category,
                        project: req.project,
                        tasks: tasks
                    })
                })
            })
        })        
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

app.post('/dashboard/model/form/user' , auth , (req, res) => {

    if(res.user){
        return res.redirect('/login')
    }

    res.render('dashboard/includes/show_staff_modal' , {
        layout: false
    })

})

app.post('/dashboard/add/user' , auth , (req , res) => { 
    
    if( !req.user ) return res.redirect('/login')

    //#### FOR SAVING TEAM MEMBER    
    const user = new User({
        firstname:  req.body.firstname,
        username: req.body.email,
        email: req.body.email,
        password: '123456'        
    })

    //#### SAVE THROUGH
    user.save((err, user) => {

        if(err){
            return res.status(400).send(err)
        }

        res.status(200).send({message:'Member Saved', status: 200})
    })
    
})


app.get('/dashboard/user/list' , auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    //#### GET THE TEAM LIST
    User.getTeamList(req.user , (err, user) => {

        if(err){
            return res.status(400).send(err)                
        }

        if(!user){
            return res.status(400).send(err)
        }

        //res.status(200).send(user)

        res.render('dashboard/teams/teams', {
            layout: false,
            teams: user,
            user: req.user
        })

    })
})

app.post('/dashboard/model/form/category' , auth , (req , res) => {

    if(!req.user) {
        return res.redirect('/login')
    }

    res.render('dashboard/includes/show_category_modal' , {
        layout: null
    })

})

app.post('/dashboard/add/category' , auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    const category = new Category({
        category_name: req.body.category_name
    })
    
    category.save((err, category) => {
        if(err) {
            return res.status(400).send(err)
        }

        res.status(200).send({message:'Category added', status: 200})
    })
})

app.get('/dashboard/category/list' , auth , (req, res) => {
    if(!req.user){
        return res.redirect('/login')
    }
    Category.find({'status': 1}, (err, category) => {
        if(err){
            return res.status(400).send(err)
        }

        res.render('dashboard/category/category', {
            layout: null,
            category: category
        })
    })
})

app.post('/dashboard/model/form/project' , auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    res.render('dashboard/includes/show_project_modal', {
        layout: null
    })

})

app.post('/dashboard/add/project', auth, (req, res) => {
    if(!req.user){
        return res.redirect('/login')
    }

    const project = new Project({
        name: req.body.name
    })

    project.save((err, project) => {

        if(err){
            return res.status(400).send(err)            
        }

        res.status(200).send({message:'Project added', status: 200})
    })
})

app.get('/dashboard/project/list' , auth ,  (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    Project.projectList((err, project) => {
        if(err){
            return res.status(400).send(err)
        }

        res.render('dashboard/project/project', {
            layout: null,
            project: project
        })
    })
})

app.post('/dashboard/task/add/input' , auth , (req, res) => {

    if(!req.user) {
        return res.redirect('/login')
    }

    res.render('dashboard/inputbox/inputbox', {
        layout: null
    })
})

app.post('/dashboard/add/new/task' , auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }
    const task = new Task({
        task_name: req.body.task_name,
        user_id: req.user._id
    })

    task.save((err, task) =>{

        if(err){
            return res.status(400).send(err)
        }

        res.status(200).json({message:'Task Added', status: 200})
    })
})

app.get('/dashboard/tasks/list' , auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    Task.getTaskList((err, tasks) => {

        if(err) {
            res.status(400).send(err)
        }

        res.render('dashboard/tasks/tasks', {
            layout: null,
            tasks: tasks
        })
    })
})

app.post('/dashboard/tasks/detail', auth ,  (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    Task.getTaskDetailById(req.body.id , (err , taskDetail) => {

        if(err){
            return res.status(400).send(err)
        }            

        //#### SET THE VIEW OF TASK DETAIL PAGE
        res.render('dashboard/tasks/task_detail', {
            layout: null,
            taskDetail
        })
    })

})

//#### UPDATE OF PARTICULAR TASK
app.post('/dashboard/tasks/detail/date/update', auth ,  (req, res) => {

    if(!req.user) {
        return res.redirect('/login')
    }

    Task.findByIdAndUpdate({'_id':req.body.task_id}, {
        fromDate: req.body.fromDate,
        toDate: req.body.toDate
    }).exec((err, doc) => {
        if(err){
            return res.status(400).send(err)
        }

        res.status(200).send(req.body)
    })
})


//#### SAVE NOTES
app.post('/dashboard/task/add/notes', auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    res.status(200).send(req.body)

})
//#### LISTENING THE SERVER PORT
app.listen(config.PORT , () => {
    console.log(`Server is running at ${config.PORT}`)
})