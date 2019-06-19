import express from 'express';
import path from 'path';
import createError from 'http-errors';
import logger from 'morgan';
//import initDatabase from './db';
import mongoose from 'mongoose';

const CONNECTION_URL = 'mongodb+srv://admin:admin@app-6pb7g.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'app-db';

import indexRouter from './routes';
import filmsRouterInitializer from './routes/films';

const app = express();

// initDatabase((db, err) => {
//   if (err) throw err;
//   // db is passed to router initializers
// });

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, dbName: DATABASE_NAME });
const connection = mongoose.connection;

connection.on('connected', function () {
  console.log('Connected to ' + DATABASE_NAME);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api/hello-world', indexRouter);
  app.use('/api/films', filmsRouterInitializer);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });
});

connection.on('error',function (err) {
  console.log('Connection error: ' + err);
});

connection.on('disconnected', function () {
  console.log('Disconnected from ' + DATABASE_NAME);
});

module.exports = app;
