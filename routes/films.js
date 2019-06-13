var express = require('express');
var validate = require('express-jsonschema').validate;
var FilmSchema = require('../schemas/FilmSchema');

var categoriesRouter = require('./filmCategories');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.send([]);
});

router.post('/', validate({body: FilmSchema}), function(req, res, next) {
  res.send(req.body);
});

router.put('/:id', validate({body: FilmSchema}), function(req, res, next) {
  if (req.body.id === req.params.id) {
    res.send(req.body);
  } else {
    res.json({ error: 'requested id doesn\'t match film object' });
  }
});

router.delete('/:id', function(req, res, next) {
  res.json({
    success: true,
    id: req.params.id
  });
});

router.use('/categories', categoriesRouter);

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

module.exports = router;
