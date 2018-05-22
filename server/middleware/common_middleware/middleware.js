const config = require('./../../config/config').get(process.env.NODE_ENV)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
const express = require('express')

module.exports = {
    body_parser: (app) => {
        app.use(bodyParser.json())
    },
    cookie_parser: (app) => {
        app.use(cookieParser())
    },
    express_hbs: (app) => {        
        app.engine('hbs' , hbs({
            extname: 'hbs',
            defaultLayout: 'main',
            helpers: require('./../../../helpers/helper'),
            layoutsDir: __dirname + './../../../views/layout',
            partialsDir: __dirname + './../../../views/partials'
        }))
    },
    express_engine: (app) => {
        app.set('view engine' , 'hbs')
    },
    xcss: (app) => {
        app.use('/css' , express.static(__dirname + `./../../../public/css`))
    },
    xjs: (app) => {
        app.use('/js' , express.static(__dirname + `./../../../public/js`))
    },
    xlib: (app) => {
        app.use('/lib' , express.static(__dirname + `./../../../public/lib`))
    },
    xfont: (app) => {
        app.use('/font' , express.static(__dirname + `./../../../public/font`))
    },
    ximg: (app) => {
        app.use('/images' , express.static(__dirname + `./../../../public/images`))
    }
}