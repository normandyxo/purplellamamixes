var PurpleLlamaPlayer = require('./purplellama-player'),
    mix = {
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

PurpleLlamaPlayer = new PurpleLlamaPlayer(mix);
