var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/mix/:mixId', function (req, res) {
    var mix = {
        title: 'Mix #1',
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
        mix: mix
    });
});

module.exports = router;
