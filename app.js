const express  = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const moment = require('moment');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

//Configuring Dotenv file
dotenv.config({path : './config/config.env'});

//Connecting Database
connectDB();

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Static folder
app.use(express.static(path.join(__dirname,'public')));

//Body-Parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(morgan('dev'));

//Routes
app.use('/' , require('./routes/index'));


const PORT = process.env.PORT;
app.listen(PORT , () => console.log(`Server is Running ${PORT}`));