var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var ajax = require('./routes/ajax');
var routes = require('./routes/index');
var users = require('./routes/users');
var diary1 = require('./routes/diary1');
var diary2 = require('./routes/diary2');
var editerFile = require('./routes/editorFile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* app.use(multer()); */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/script',express.static(__dirname+"/script"));


app.use('/', routes);
app.use('/users', users);
app.use('/ajax', ajax);
app.use('/diary1',diary1);
app.use('/diary2',diary2);
app.use('/editorFile',editerFile);



/* app.use(multer()); */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.use(session({
	secret: 'octavecluster',
	resave: false,
	saveUninitialized: true
}));



	
module.exports = app;
