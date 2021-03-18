const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Routes
const authRoute = require('./routes/auth/index');
const toDoListRoute = require('./routes/todolist/index');

//Global function for making response
global.generateResult = function(res, success, endpoint, message, data = false)
{
    const result = {
        'endpoint': endpoint,
        'success': success,
        'message': message
    };

    if(data !== false)
        result['data'] = data;

    res.json({ result });
}

const app = express();

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth/', authRoute);
app.use('/api/todolist/', toDoListRoute);

//Catch 404 and forward to error handler
app.use(function(req, res, next)
{
    next(createError(404));
});

//Error handler
app.use(function(err, req, res, next)
{
    //Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;