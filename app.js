const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2');

const signupRoute = require('./routes/auth/signup');
const signinRoute = require('./routes/auth/signin');
const showListRoute = require('./routes/todolist/show');
const addListEntryRoute = require('./routes/todolist/add');
const modifyListEntryRoute = require('./routes/todolist/modify');
const removeListEntryRoute = require('./routes/todolist/remove');

const app = express();

const connection = mysql.createConnection(
{
    host: '192.168.1.16',
    user: 'root',
    password: '',
    database: 'zadanie2'
});

console.log(connection.connect());

global.genereateResult = function (res, success, endpoint, message, data = false)
{
    const result = {
        'endpoint': endpoint,
        'success': success,
        'message': message
    };

    if(data !== false)
        result['data'] = data;

    res.json(
    {
        result
    });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth/signup', signupRoute);
app.use('/api/auth/signin', signinRoute);
app.use('/api/todolist/show', showListRoute);
app.use('/api/todolist/add', addListEntryRoute);
app.use('/api/todolist/modify', modifyListEntryRoute);
app.use('/api/todolist/remove', removeListEntryRoute);

//Catch 404 and forward to error handler
app.use(function(req, res, next)
{
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next)
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;