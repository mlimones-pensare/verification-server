var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const auth = require('./middleware/auth');
var meRouter = require('./routes/me.router');
var keysRouter = require('./routes/keys.router');
var registrationRouter = require('./routes/registration.router');
var paymentsRouter = require('./routes/payments.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth.initialize());

app.use('/auth', auth.authRouter);
app.use('/me', meRouter);
app.use('/keys', keysRouter);
app.use('/registration', registrationRouter);
app.use('/payments', paymentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
