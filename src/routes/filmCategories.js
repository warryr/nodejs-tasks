import express from 'express';
import mongoose from 'mongoose';
import { validate } from 'express-jsonschema';

import FilmCategorySchema from '../jsonSchemas/filmCategorySchema';
import FilmCategory from '../models/filmCategory';

const router = express.Router();

router.get('/', (req, res, next) => {
  FilmCategory.find(
    {},
    {
      id: '$_id',
      _id: 0,
      title: 1,
      description: 1,
      films: 1,
    },
    (err, docs) => {
      if (err) throw err;
      res.send(docs);
    }
  );
});

router.post('/', validate({ body: FilmCategorySchema }), (req, res, next) => {
  FilmCategory.create(
    {
      _id: mongoose.Types.ObjectId(),
      ...req.body,
    },
    (err, category) => {
      if (err) throw err;
      category.id = category._id;
      delete category._id;
      res.send(category);
    }
  );
});

router.put('/:id', validate({ body: FilmCategorySchema }), (req, res, next) => {
  FilmCategory.findByIdAndUpdate(req.params.id, req.body,{ new: true }, (err, category) => {
    if (err) throw err;
    category ? res.send(category) : res.status(404).json({ error: "requested id doesn't match category object" });
  });
});

router.delete('/:id', (req, res, next) => {
  FilmCategory.findByIdAndDelete(req.params.id, {}, (err, category) => {
    if (err) throw err;
    if (category) {
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
