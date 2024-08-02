require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const app = express();
const path = require('path');
const PORT = 3001;
const connectDB = require('./server/config/db');
const session = require('express-session');
connectDB();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(expressLayout);
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/img', express.static('img'));
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))
app.listen(PORT, () => {
    console.log('server has been launched');
})
