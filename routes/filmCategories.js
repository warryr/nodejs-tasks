var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var validate = require('express-jsonschema').validate;
var FilmCategorySchema = require('../schemas/FilmCategorySchema');

var router = express.Router();

var initializeRouter = function(db) {
  router.get('/', function(req, res, next) {
    db.collection('film-categories')
      .find({}, {
        id: '$_id',
        _id: 0,
        title: 1,
        description: 1,
        films: 1,
      })
      .toArray(function(err, doc) {
        if (err) throw err;
        res.send(doc);
      });
  });

  router.post('/', validate({ body: FilmCategorySchema }), function(req, res, next) {
    db.collection('film-categories').insertOne(req.body, function(err, doc) {
      if (err) throw err;
      var category = doc.ops[0];
      category.id = category._id;
      delete category._id;
      res.send(category);
    });
  });

  router.put('/:id', validate({ body: FilmCategorySchema }), function(req, res, next) {
    db.collection('film-categories').findOneAndUpdate(
      { _id: ObjectID(req.params.id) },
      { $set: req.body },
      { returnOriginal: false },
      function(err, doc) {
        if (err) throw err;
        res.send(doc.value);
      }
    );
  });

  router.delete('/:id', function(req, res, next) {
    db.collection('film-categories').deleteOne(
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
