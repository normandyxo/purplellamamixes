var $ = require('jquery');

$(document).ready(function () {
    var PurpleLlamaPlayer = require('./purplellama-player'),
        mix = {
            title: 'Mix #1',
            url: '/mixes/test-mix.mp3',
            tracks: [{
                title: 'song 1',
                coverImage: 'http://placehold.it/120/red',
                timestamp: 0
            },{
                title: 'song 2',
                coverImage: 'http://placehold.it/120/454545',
                timestamp: 10
            },{
                title: 'song 3',
                coverImage: 'http://placehold.it/120/04F93E',
                timestamp: 20
            },{
                title: 'song 4',
                coverImage: 'http://placehold.it/120/FFB657',
                timestamp: 30
            },{
                title: 'song 5',
                coverImage: 'http://placehold.it/120/FFBB12',
                timestamp: 40
            },{
                title: 'song 4',
                coverImage: 'http://placehold.it/120/FFB686',
                timestamp: 50
            }]
        };

    PurpleLlamaPlayer = new PurpleLlamaPlayer(mix);
});
