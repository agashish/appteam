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

//#### TO PREVENT BROWSER THROW AN ERRO TO MAKE COSS ORIGIN REQUEST
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
const {AssignUser} = require('./models/usser_assign')
const {AssignProject} = require('./models/project_assign')

//#### MOST IMPORTAN NOTE ####################
// As Neil mentioned in the comments, Mongoose will automatically convert strings to ObjectIds when appropriate. However, the root cause of your problem is that you're using the wrong ObjectId class. Mongoose actually provides two different classes with the same name:
// mongoose.Schema.Types.ObjectId
// mongoose.Types.ObjectId
// You should use the first one when defining schemas and the second one when explicitly creating ObjectIds for queries. Replacing the one line where you define ObjectId fixes your code:

// var mongoose = require('mongoose');
// var ObjectId = mongoose.Types.ObjectId;

// //Here I have req.query.where: "591f47d10d957323386f0c42".
// var qrySearch={"_id": new ObjectId(req.query.where)};
//     Ag_escalaatendimento.find(qrySearch)
//     .exec( (err,data) => {
//        callback(err,data,res)
//     })
// });
//############################################
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
                        tasks: tasks,
                        notes: true
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
        _id: new mongoose.Types.ObjectId(),
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
        _id: new mongoose.Types.ObjectId(),
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
        _id: new mongoose.Types.ObjectId(),
        task_name: req.body.task_name,
        user_id: req.user._id,
        user: req.user._id
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
        
        //#### GET ALL NOTES ACCORDING TO TASK_ID
        Notes.find({
                'task':req.body.id,
                'status': 0,
                'isDeleted': 0
            }            
        )
        .exec((err, notes) => {

            //#### Assign User List
            AssignUser.find({task: req.body.id}).populate('user').exec((err, assign) =>{
                if(err) {
                    return res.status(400).send(err)                        
                }

                //#### SET THE VIEW OF TASK DETAIL PAGE
                res.render('dashboard/tasks/task_detail', {
                    layout: null,
                    taskDetail,
                    notes: false,
                    noteList: notes,
                    user: req.user,
                    assignUserData: assign
                })
            })
        })
    })
})

//#### UPDATE OF PARTICULAR TASK
app.post('/dashboard/tasks/detail/date/update', auth ,  (req, res) => {

    if(!req.user) {
        return res.redirect('/login')
    }
    Task.findById({'_id':req.body.task_id}, (err, task) => {
        
        if(err){
            return res.status(400).send(err)        
        }

        //#### UPDATE THE TASK WITH DATES
        task.fromDate = moment(req.body.fromDate).format("DD-MM-YYYY")
        task.toDate = moment(req.body.toDate).format("DD-MM-YYYY")

        task.save((err, task) => {
            if(err){
                return res.status(400).send(err)
            }

            res.status(200).send({message:'updated', status: 200})
        })

    })
})


//#### SAVE NOTES
app.post('/dashboard/task/add/notes', auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    //#### SET THE SCHEMA WITH NOTES MODEL CONSTRUCTOR
    const note = new Notes({
        _id: new mongoose.Types.ObjectId(),
        task: req.body.id,
        notes: req.body.comment,
        user_id: req.user._id,
        user: req.user._id    
    })

    //#### NOW SAVE INTO NOTES COLLECTION
    note.save((err, note) => {
        if(err){
            return res.status(400).send(err)
        }        
        res.status(200).send({message:'Note Added', status: 200})
    })
})

app.post('/dashboard/task/notes/list', auth, (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    const tsk_id = req.header('X-TSK-ID')

    //#### GET ALL NOTES ACCORDING TO TASK_ID
    Notes.find({
            'task':tsk_id,
            'status': 0,
            'isDeleted': 0
        }            
    )
    .exec((err, notes) => {

        //#### SET THE VIEW OF TASK DETAIL PAGE
        res.render('dashboard/notes/notes', {
            layout: null,
            notes: false,
            user: req.user,
            noteList: notes
        })
    })
})

//#### INVOKE TO UPDATE AND SAVE COMMENT ROUTE
app.post('/dashboard/task/add-update/comment' , auth , (req, res) => {

    if(!req.user) {
        return res.redirect('/login')
    }

    Task.findById({'_id':req.body.id}, (err, task) => {
        
        if(err){
            return res.status(400).send(err)        
        }

        //#### UPDATE THE TASK WITH DATES
        task.description = req.body.description

        task.save((err, task) => {
            if(err){
                return res.status(400).send(err)
            }

            res.status(200).send({message:'Description updated', status: 200})
        })
    })
})

//#### Request for assign user list
app.post('/dashboard/assign/user/list' , auth , (req, res) => {

    if(!req.user){
        return res.redirect('/login')
    }

    //#### GET ID FROM HEADER
    const task_id = req.header('X-TSK-ID')
     
    // Notes.find().populate('task').exec((err, notes) =>{
    //     return res.status(200).send(notes)
    // })

    //#### GET USER LIST
    User.getAssignUserList(task_id , (err, users) => {
        if(err){
            return res.status(400).send(err)
        }

        res.removeHeader('Transfer-Encoding');
        res.removeHeader('X-Powered-By');
        res.render('dashboard/user_list/user_list', {
            layout: null,
            userList: users
        })
    })
})

app.get('/dashboard/:userid/detail', (req, res) => {
    res.end('Hello')
})

//####################################################
    //#### ASSING USER TO SPECIFC TASK
//####################################################
app.post('/dashboard/assign/user/task', auth, (req, res) => {

    if(!req.user) {
        return res.redirect('/login')
    }

    //#### REMOVE HEADERS
    res.removeHeader('Transfer-Encoding');
    res.removeHeader('X-Powered-By');
    res.removeHeader('X-TSK-ID');

    const assignUser = new AssignUser({
        _id: mongoose.Types.ObjectId(),
        user: req.body.id,
        task: req.body.task_id,
        user_id: req.user._id
    })

    assignUser.save((err, save) =>{

        if(err){
            return res.status(400).send({message: err, status:400})
        }

        res.status(200).send({message:'User assigned', status: 200})
    })

})

//####################################################
    //#### LIST OF NON ASSIGN USER
//####################################################
app.post('/dashboard/assigned/user/list', auth, (req, res) => {

    if(!req.user) {
        return res.redirect('/login')
    }

    //#### LIST OF NON ASSIGN USER QUERY
    AssignUser.find({task: req.header('X-TSK-ID')}).populate('user').exec((err, assign) =>{

        if(err) {
            return res.status(400).send(err)                        
        }

        //#### SET THE VIEW OF TASK DETAIL PAGE
        res.render('dashboard/assign_user_list/assign_user_list', {
            layout: null,
            assignUserData: assign
        })
    })
})

//####################################################
    //#### LIST OF NON ASSIGN PROJECT
//####################################################
app.post('/dashboard/task/project/list' , auth, (req, res) => {

    if(!req.user) {
        return res.redirect('/login')
    }

    Project.getAssignProjectList(req.header('X-TSK-ID') , (err , nonAssignProjects) => {

        if(err) {
            return res.status(400).send(err)
        }

        res.render('dashboard/project_list/project_list' , {
            layout: null,
            nonAssignProjects: nonAssignProjects
        })
    })
})

//#### LISTENING THE SERVER PORT
app.listen(config.PORT , () => {
    console.log(`Server is running at ${config.PORT}`)
})