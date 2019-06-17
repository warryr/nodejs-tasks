const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.name) {
    res.render('index', { title: 'Express', name: req.query.name });
  } else {
    res.status(400).json({ message: 'Missing name parameter' });
  }
});

module.exports = router;
