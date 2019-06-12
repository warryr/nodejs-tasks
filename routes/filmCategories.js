var express = require('express');
var router = express.Router();

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
    res.json({ error: 'requested id doesn\'t match category object' });
  }
});

router.delete('/:id', function(req, res, next) {
  res.json({
    success: true,
    id: req.params.id
  });
});

module.exports = router;
