var $ = require('jquery');

var _player = {
    $mixContent: null,
    $nowPlaying: null,
    $upcoming: null,
    audio: null,
    $playedTrigger: null,

    mix: [],
    trackStack: [],
    currentTrack: null,
    played: [],
    currentIndex: 0,

    initializeElements: function () {
        var self = this;

        self.$mixContent = $('#mix-content');
        self.$nowPlaying = self.$mixContent.children('.now-playing');
        self.$played = self.$mixContent.children('.tracks.tracks__played');
        self.$upcoming = self.$mixContent.children('.tracks.tracks__upcoming');
        self.$playedTrigger = self.$mixContent.children('.tracks__played__trigger');
    },


    updateCurrentTrack: function (done) {
        var self = this;
        self.$nowPlaying.stop().fadeOut(500, function () {

            $(this)
                .css({
                    'background-image': 'url(' + self.currentTrack.coverImage +')'
                })
                .fadeIn(500)
                .promise()
                .done(done);
        });
    },

    initializeUpcomingTracks: function (indexOffset) {
        var self = this,
            $track;

        if (typeof indexOffset === 'undefined') {
            indexOffset = 0;
        }
        self.trackStack.forEach(function (upcoming, i) {

            $track = $('<div class="track"></div>')
                    .css({
                        'background-image': 'url(' + upcoming.coverImage + ')'
                    })
                    .text(upcoming.title)
                    .data('trackIndex', i + 1 + indexOffset);
            self.$upcoming.append($track);
        });
    },

    createTrackElement: function (track, index) {

        return $('<div class="track"></div>')
            .css({
                'background-image': 'url(' + track.coverImage + ')'
            })
            .text(track.title)
            .data('trackIndex', index);

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
        var self = this,
            $control;

        self.mix = mix;
        self.trackStack = self.mix.tracks.slice();
        self.currentTrack = self.trackStack.shift();
        self.audio = new Audio();
        self.audio.src = self.mix.url;

        self.updateCurrentTrack();
        self.initializeUpcomingTracks();

        $control = self.$nowPlaying.find('.overlay__controls > img');

        // toggle play/pause
        $control.bind('click', function () {
            if (self.audio.paused) {
                self.audio.play();
            }
            else {
                self.audio.pause();
            }
        });

        self.$playedTrigger.bind('click', function () {
            self.$played.toggleClass('tracks__played--hide');
            $(this).toggleClass('tracks__played__trigger--hidden');
        });

        self.audio.ontimeupdate = function checkTrack () {
            var previous,
                trackIndex;

            if (self.trackStack.length) {
                if (Math.floor(self.audio.currentTime) > self.trackStack[0].timestamp) {

                    // remove the first child of the $upcoming tracks
                    self.$upcoming.find('.track:first').fadeOut(500, function () {

                        trackIndex = $(this).data('trackIndex');
                        $(this).remove();

                        previous = self.currentTrack;

                        // pop the stack to get the new currentTrack
                        self.currentTrack = self.trackStack.shift();
                        self.updateCurrentTrack(function () {
                            // add the currentTrack as the latest played.
                            self.addTrackToPlayed(self.createTrackElement(previous, trackIndex - 1));
                        });
                    });
                }
            }
        };

        /**
         * When a track is clicked, skip the audio to that track and re-render the UI
         */
        $('.tracks').on('click', '.track', function onClickTrack (event) {
            var trackIndex = $(event.target).data('trackIndex'),
                played = [],
                i;

            self.audio.pause();

            self.trackStack = self.mix.tracks.slice();
            self.currentTrack = self.trackStack[trackIndex];

            played = self.trackStack.slice(0, trackIndex);
            self.trackStack = self.trackStack.slice(trackIndex + 1);

            self.updateCurrentTrack(function () {

                // reset the played rows
                self.$played.empty().append('<div class="tracks__row pull-left"></div>');
                // reset the upcoming rows
                self.$upcoming.empty().append('<div class="tracks__row"></div>')

                if (trackIndex == 0) {
                    self.audio.currentTime = 0;
                }
                else {

                    // re render the played tracks
                    played.forEach(function (playedTrack, index) {
                        self.addTrackToPlayed(self.createTrackElement(playedTrack, index));
                        self.$played.finish();
                    });

                    self.audio.currentTime = self.currentTrack.timestamp;
                }

                self.initializeUpcomingTracks(trackIndex);
                self.$upcoming.finish();

                self.audio.play();
            });
        });
    }
};

var PurpleLlamaPlayer = function (mix) {

    _player.initializeElements();
    _player.initializeMix(mix);
};


module.exports = PurpleLlamaPlayer;
