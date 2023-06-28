var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/inicio');
var usersRouter = require('./routes/perfil');
var signinRouter = require('./routes/entrar');
var acessRouter = require('./routes/acess');
var signupRouter = require('./routes/criar-conta');
var createRouter = require('./routes/create');
var aboutRouter = require('./routes/sobre');
var servicesRouter = require('./routes/servicos');
var contactsRouter = require('./routes/contatos');
var scheduleRouter = require('./routes/agende-seu-horario');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/perfil', usersRouter);
app.use('/perfil/entrar', signinRouter);
app.use('/perfil/entrar/acess', acessRouter);
app.use('/perfil/criar-conta', signupRouter);
app.use('/perfil/criar-conta/create', createRouter);
app.use('/sobre', aboutRouter);
app.use('/servicos', servicesRouter);
app.use('/contatos', contactsRouter);
app.use('/agende-seu-horario', scheduleRouter);


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

module.exports = app;
