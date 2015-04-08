var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/mix/:mixId', function (req, res) {
  res.render('mix', { mixId: req.params.mixId });
});

module.exports = router;
