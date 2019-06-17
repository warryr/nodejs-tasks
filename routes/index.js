var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.query.name) {
    res.render('index', { title: 'Express', name: req.query.name });
  } else {
    res.status(400);
    res.json({ message: 'Missing name parameter' });
  }
});

module.exports = router;
