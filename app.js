import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
import createError from 'http-errors';
import logger from 'morgan';

import indexRouter from './routes/index';
import filmsRouterInitializer from './routes/films';

const CONNECTION_URL = 'mongodb+srv://admin:admin@app-6pb7g.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'app-db';

const app = express();

let database;
const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

client.connect(err => {
  if (err) throw err;
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

module.exports = app;
