var $ = require('jquery');

var _player = {
    $mixContent: null,
    $nowPlaying: null,
    $upcoming: null,
    $upcoming: null,

    trackStack: [],
    currentTrack: null,

    initializeElements: function () {
        var self = this;

        self.$mixContent = $('#mix-content');
        self.$nowPlaying = self.$mixContent.children('.now-playing');
        self.$upcoming = self.$mixContent.children('.tracks.tracks--upcoming');
        self.$upcoming = self.$mixContent.children('.tracks.tracks--upcoming');
    },

    initializeMix: function (mix) {
        var self = this;

        console.log(mix);

        self.trackStack = mix.tracks.slice();
        self.currentTrack = self.trackStack.shift();


        self.$nowPlaying.text(self.currentTrack.title);

    }
};

var PurpleLlamaPlayer = function (mix) {

    _player.initializeElements();
    _player.initializeElements();
    _player.initializeMix(mix);
};


module.exports = PurpleLlamaPlayer;
