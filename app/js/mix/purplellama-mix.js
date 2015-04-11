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
                timestamp: 3
            },{
                title: 'song 3',
                coverImage: 'http://placehold.it/120/04F93E',
                timestamp: 6
            },{
                title: 'song 4',
                coverImage: 'http://placehold.it/120/FFB657',
                timestamp: 9
            },{
                title: 'song 5',
                coverImage: 'http://placehold.it/120/FFBB12',
                timestamp: 12
            },{
                title: 'song 6',
                coverImage: 'http://placehold.it/120/FFB686',
                timestamp: 15
            },{
                title: 'song 7',
                coverImage: 'http://placehold.it/120/65870',
                timestamp: 18
            },{
                title: 'song 8',
                coverImage: 'http://placehold.it/120/red',
                timestamp: 21
            },{
                title: 'song 9',
                coverImage: 'http://placehold.it/120/454545',
                timestamp: 24
            },{
                title: 'song 10',
                coverImage: 'http://placehold.it/120/04F93E',
                timestamp: 27
            },{
                title: 'song 11',
                coverImage: 'http://placehold.it/120/FFB657',
                timestamp: 30
            }]
        };

    PurpleLlamaPlayer = new PurpleLlamaPlayer(mix);
});
