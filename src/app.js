import express from 'express';
import path from 'path';
import createError from 'http-errors';
import logger from 'morgan';
import connectToMongoose from './models/db';

import indexRouter from './routes';
import filmsRouter from './routes/films';

const app = express();
connectToMongoose();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/hello-world', indexRouter);
app.use('/api/films', filmsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
