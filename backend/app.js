var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var parisEventRouter = require('./routes/parisEvent');
var touristeRouter = require('./routes/touristes');
var baladeRouter = require('./routes/balades');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/touristes', touristeRouter);
app.use('/movies', moviesRouter);
app.use('/parisEvent', parisEventRouter);
app.use('/balade', baladeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbName = 'BDD'; // Nom de votre BDD
const dbUrl = `mongodb://localhost:27017/${dbName}`;

// Connecting to the db
mongoose.connect(dbUrl, {
     useNewUrlParser: true,
     family: 4
});

module.exports = app;