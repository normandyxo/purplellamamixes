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
        self.$played = self.$mixContent.children('.tracks.tracks__played');
        self.$upcoming = self.$mixContent.children('.tracks.tracks__upcoming');
    },

    updateCurrentTrack: function (done) {
        var self = this;
        self.$nowPlaying.stop().fadeOut(500, function () {
            $(this)
                .css({
                    'background-image': 'url(' + self.currentTrack.coverImage +')'
                })
                .fadeIn(500, done);
        });
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

    createTrackElement: function (track) {

        return $('<div class="track"></div>')
            .css({
                'background-image': 'url(' + track.coverImage + ')'
            })
            .text(track.title);

    },

    addTrackToPlayed: function ($track, rowIndex) {
        var self = this,
            $playedRows = self.$played.children(),
            $row;

        if (rowIndex === null || typeof rowIndex === 'undefined' || isNaN(rowIndex)) {
            rowIndex = $playedRows.length - 1;
        }

        if (rowIndex <= $playedRows.length - 1) {
            $row = $playedRows.eq(rowIndex);

            if ($row.children('.track').length == 4) {
                self.addTrackToPlayed($track, rowIndex + 1);
            }
            else {
                if ($row.hasClass('pull-left')) {
                    $track.hide().appendTo($row).fadeIn(500);
                }
                else {
                    $track.hide().prependTo($row).fadeIn(500);
                }
            }
        }
        else {

            $('<div class="tracks__row"></div>').appendTo(self.$played).fadeIn(500, function () {
                self.addTrackToPlayed($track, rowIndex);

                if ($(this).prev().hasClass('pull-left')) {
                    $(this).addClass('pull-right');
                }
                else {
                    $(this).addClass('pull-left');
                }
            });
        }
    },

    initializeMix: function (mix) {
        var self = this;

        self.trackStack = mix.tracks.slice();
        self.currentTrack = self.trackStack.shift();
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
            var previous;

            if (self.trackStack.length) {
                if (Math.floor(self.audio.currentTime) >= self.trackStack[0].timestamp) {

                    // remove the first child of the $upcoming tracks
                    self.$upcoming.find('.track:first').fadeOut(500, function () {
                        $(this).remove();

                        previous = self.currentTrack;

                        // pop the stack to get the new currentTrack
                        self.currentTrack = self.trackStack.shift();
                        self.updateCurrentTrack(function () {
                            // add the currentTrack as the latest played.
                            self.addTrackToPlayed(self.createTrackElement(previous));
                        });
                    });
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
