var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res) {
  res.render('index', {
      title: '',
      active: 'home'
  });
});

router.get('/about', function (req, res) {
    res.render('about', {
        title: 'About',
        active: 'about'
    });
});

router.get('/mix/:mixId', function (req, res) {
    var mix = {
        title: 'Mix #1',
        url: 'mixes/test-mix.mp3',
        tracks: [{
            title: 'song 1',
            timestamp: 0
        },{
            title: 'song 2',
            timestamp: 5
        },{
            title: 'song 3',
            timestamp: 10
        },{
            title: 'song 4',
            timestamp: 15
        }]
    };

    res.render('mix', {
        mixId: req.params.mixId,
        mix: mix,
        active: ''
    });
});

module.exports = router;
