// 加载 Express 模块
var express = require('express');
// 加载 path 模块
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var addArticle = require('./routes/addArticle');
var products = require('./routes/products');
var updateProducts = require('./routes/updateProducts');

var app = express();

// view engine setup
// 设置文件夹为存放视图文件的目录
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为 ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 开发环境下，终端显示简单的日志
app.use(logger('dev'));
// 解析请求体，支持application/json、application/x-www-form-urlencoded和multipart/form-dta
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.multipart());


app.use(cookieParser());
// 根据目录下的public文件夹设置为存放image，css，js
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/addArticle', addArticle);
app.use('/products', products);
app.use('/updateProducts', updateProducts);

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


module.exports = app;
