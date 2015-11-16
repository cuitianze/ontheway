// 加载 Express 模块
var express = require('express');
// 加载 path 模块
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// MongoSkin 
var db = require('mongoskin').db('http://192.168.1.106:27017');
db.bind('person');
// MongoDB Native
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://tianze:tianze123@ds048487.mongolab.com:48487/mean-first-20140706";


var routes = require('./routes/index');
var users = require('./routes/users');
var addArticle = require('./routes/addArticle');

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

var doc = {
  "name": "微农云商",
  "address": "洛克时代大厦"
};

app.use('/', routes);
app.use('/users', users);
app.use('/addArticle', addArticle);

app.get('/article', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if(err) {
      throw err;
    }
    db.collection('article').find().toArray(function(err, result) {
      if(err) {
        throw err;
      }
      console.log(result);
      res.json(result);
    });
  });
});

app.get('/get', function(req, res, next) {
  res.send(doc);
});

app.post('/post', function(req, res, next) {
console.log(req.body);
  db.person.insert(req.body, function(err, result) {
    console.log(err);
    console.log(result);
    db.close();
  });
  res.send('200');
});
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
