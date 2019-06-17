var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var createError = require('http-errors');
var logger = require('morgan');

var CONNECTION_URL = 'mongodb+srv://admin:admin@app-6pb7g.mongodb.net/test?retryWrites=true&w=majority';
var DATABASE_NAME = 'app-db';

var indexRouter = require('./routes/index');
var filmsRouterInitializer = require('./routes/films');

var app = express();
var database;
var client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

client.connect(err => {
  if (err) {
    throw err;
  }
  database = client.db(DATABASE_NAME);
  console.log('Connected to `' + DATABASE_NAME + '`!');

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api/hello-world', indexRouter);
  app.use('/api/films', filmsRouterInitializer(database));

  app.use(function(req, res, next) {
    next(createError(404));
  });

  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });
});

module.exports = app;
