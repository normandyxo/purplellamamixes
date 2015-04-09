var $ = require('jquery');

var _player = {
    $mixContent: null,
    $nowPlaying: null,
    $upcoming: null,
    $upcoming: null,
    audio: null,

    trackStack: [],
    currentTrack: null,
    played: [],

    initializeElements: function () {
        var self = this;

        self.$mixContent = $('#mix-content');
        self.$nowPlaying = self.$mixContent.children('.now-playing');
        self.$played = self.$mixContent.children('.tracks.tracks--played');
        self.$upcoming = self.$mixContent.children('.tracks.tracks--upcoming');
    },

    updateCurrentTrack: function () {
        var self = this;
        self.$nowPlaying.css({
            'background-image': 'url(' + self.currentTrack.coverImage +')'
        });
    },

    addTrackToPlayed: function (track) {
        var self = this,
            $track = $('<div class="track"></div>').css({
            'background-image': 'url(' + track.coverImage + ')'
        });
        self.$played.prepend($track);;
    },

    initializeUpcomingTracks: function () {
        var self = this,
            $track;

        self.trackStack.forEach(function (upcoming, i) {
            $track = $('<div class="track"></div>')
                    .css({
                        'background-image': 'url(' + upcoming.coverImage + ')'
                    });
            self.$upcoming.append($track);
        });
    },

    initializeMix: function (mix) {
        var self = this;

        self.trackStack = mix.tracks.slice();
        self.currentTrack = self.trackStack.shift();
        self.$nowPlaying.text(self.currentTrack.title);
        self.audio = new Audio();
        self.audio.src = mix.url;

        self.updateCurrentTrack();
        self.initializeUpcomingTracks();

        // toggle play/pause
        self.$nowPlaying.bind('click', function () {
            if (self.audio.paused) {
                self.audio.play();
            }
            else {
                self.audio.pause();
            }
            self.$nowPlaying.toggleClass('playing')
        });

        self.audio.ontimeupdate = function checkTrack () {

            if (self.trackStack.length) {
                if (Math.floor(self.audio.currentTime) >= self.trackStack[0].timestamp) {

                    // remove the first child of the $upcoming tracks
                    self.$upcoming.find('.track:first').remove();

                    // add the currentTrack as the latest played.
                    self.addTrackToPlayed(self.currentTrack);

                    // pop the stack to get the new currentTrack
                    self.currentTrack = self.trackStack.shift();
                    self.updateCurrentTrack();
                }
            }
        };
    }
};

var PurpleLlamaPlayer = function (mix) {

    _player.initializeElements();
    _player.initializeMix(mix);
};


module.exports = PurpleLlamaPlayer;
