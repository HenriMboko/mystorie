require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const connectionDb = require('./config/db');
const routeConfig = require('./routes/routeConfig');
const authRoute = require('./routes/authRoute');
const passport = require('passport');
const session = require("express-session");
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const config = require('./config/config');
const FileStore = require('session-file-store')(session)
const app = express();

require('./config/authenticate')(passport);


if(process.env.NODE_ENV==='developpement'){
    app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Sessions

app.use(session({
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
    //store : new FileStore()
  }));



//configure passport middleware
app.use(passport.initialize());
app.use(passport.session());



//connection to database mongodb
connectionDb;

// call route view
app.use('/', routeConfig);
app.use('/auth',authRoute);

//@route logout
//route get /logout

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
  });

//express handlebars
app.engine('.hbs', engine({defaultLayout : false  ,extname : '.hbd'}));
app.set('view engine', '.hbs');


//utilisation de fichier externe

app.use(express.static(path.join(__dirname,'public')));
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname,'node_modules/jquery/dist')));
app.use('/fonts',express.static(path.join(__dirname,'node_modules/bootstrap-icons/font')));


//initialisation de express

const Port = process.env.PORT;

app.listen(Port,()=>{
    console.log(`Server running succesful http://localhost:${Port}`)
})





