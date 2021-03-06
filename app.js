var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//cookies, mongodb,parser
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoBase = require('connect-mongo')(session);
var dbURL = 'mongodb://localhost/tripG'


//Router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

//解析请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//set session, Blog 上看的，暂时没发现这段代码怎么做到session的作用
app.use(session({
  secret:'express',
  store: new mongoBase({
    url: dbURL,
    collection: 'sessions'
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);

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
  var loginUser = req.session.user;
  res.render('error', {
    user: loginUser
  });
});

mongoose.connect(dbURL,{useNewUrlParser: true}, function (err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(port);
        console.log('> Listening at ' + uri + '\n');
        opn(uri);
    }
});

app.use(function (req, res, next) {
  var _user = req.session.user;
  app.locals.user = _user;
  return next();
});

module.exports = app;
