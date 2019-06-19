import express from 'express';
import mongoose from 'mongoose';
import { validate } from 'express-jsonschema';

import FilmSchema from '../jsonSchemas/filmSchema';
import Film from '../models/film';

import categoriesRouter from './filmCategories';

const router = express.Router();

router.get('/', (req, res, next) => {
  const query = req.query.category ? { category: req.query.category } : {};
  Film.find(
    query,
    {
      id: '$_id',
      _id: 0,
      title: 1,
      description: 1,
      avatar: 1,
      gallery: 1,
      rating: 1,
      category: 1,
    },
    { $limit: 10 },
    (err, docs) => {
      if (err) throw err;
      res.send(docs);
    }
  );
});

router.post('/', validate({ body: FilmSchema }), (req, res, next) => {
  Film.create(
    {
      _id: mongoose.Types.ObjectId(),
      ...req.body,
    },
    (err, film) => {
      if (err) throw err;
      film.id = film._id;
      delete film._id;
      res.send(film);
    }
  );
});

router.put('/:id', validate({ body: FilmSchema }), (req, res, next) => {
  Film.findByIdAndUpdate(req.params.id, req.body,{ new: true }, (err, film) => {
    if (err) throw err;
    film ? res.send(film) : res.status(404).json({ error: "requested id doesn't match film object" });
  });
});

router.delete('/:id', (req, res, next) => {
  Film.findByIdAndDelete(req.params.id, {}, (err, film) => {
    if (err) throw err;
    if (film) {
      res.json({
        success: true,
        id: req.params.id,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  });
});

router.use('/categories', categoriesRouter);

router.use((err, req, res, next) => {
  if (err.name === 'JsonSchemaValidation') {
    const errors = {};
    err.validations.body.map(object => (errors[object.property] = object.messages[0]));
    res.status(400).send(errors);
  } else {
    next(err);
  }
});

export default router;
