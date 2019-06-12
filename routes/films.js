var express = require('express');
var router = express.Router();

var categoriesRouter = require('./filmCategories');

router.get('/', function(req, res, next) {
  res.send([]);
});

router.post('/', function(req, res, next) {
  res.send(req.body);
});

router.put('/:id', function(req, res, next) {
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

module.exports = router;
