var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var validate = require('express-jsonschema').validate;
var FilmSchema = require('../schemas/FilmSchema');

var categoriesRouterInitializer = require('./filmCategories');

var router = express.Router();

var initializeRouter = function(db) {
  // GET по категории

  router.get('/', function(req, res, next) {
    var query = req.query.category ? { category: req.query.category } : {};
    db.collection('films')
      .find(query, {
        id: '$_id',
        _id: 0,
        title: 1,
        description: 1,
        avatar: 1,
        gallery: 1,
        rating: 1,
        category: 1,
      })
      .limit(10)
      .toArray(function(err, doc) {
        if (err) throw err;
        res.send(doc);
      });
  });

  router.post('/', validate({ body: FilmSchema }), function(req, res, next) {
    db.collection('films').insertOne(req.body, function(err, doc) {
      if (err) throw err;
      var film = doc.ops[0];
      film.id = film._id;
      delete film._id;
      res.send(film);
    });
  });

  router.put('/:id', validate({ body: FilmSchema }), function(req, res, next) {
    db.collection('films').findOneAndUpdate(
      { _id: ObjectID(req.params.id) },
      { $set: req.body },
      { returnOriginal: false },
      function(err, doc) {
        if (err) throw err;
        if (!doc.value) {
          res.status(404).json({ error: "requested id doesn't match category object" });
        } else {
          res.send(doc.value);
        }
      }
    );
  });

  router.delete('/:id', function(req, res, next) {
    db.collection('films').deleteOne(
      {
        _id: ObjectID(req.params.id),
      },
      function(err, doc) {
        if (err) throw err;
        if (doc.deletedCount) {
          res.json({
            success: true,
            id: req.params.id,
          });
        } else {
          res.status(404).json({
            success: false,
          });
        }
      }
    );
  });

  router.use('/categories', categoriesRouterInitializer(db));

  router.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
      var errors = {};
      err.validations.body.map(function(object) {
        errors[object.property] = object.messages[0];
      });
      res.status(400).send(errors);
    } else {
      next(err);
    }
  });

  return router;
};

module.exports = initializeRouter;
