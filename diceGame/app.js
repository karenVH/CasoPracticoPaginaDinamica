const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors=require('cors');

//conexion a base de datos
 const URI = 'mongodb://localhost:27017/dicegamedb';

//conexion de la base de datos llamada desde la url ubicada en URI
mongoose.connect(URI, {useNewUrlParser: true})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err, 'La base de datos no fue conectada, intente de nuevo'));

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middelewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/creategame', require('./routes/index'));
app.use('/startgame', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log("Upss...algo salió mal")
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



module.exports = app;
