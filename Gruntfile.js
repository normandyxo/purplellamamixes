'use strict';

var request = require('request');

module.exports = function (grunt) {

    var reloadPort = 35729,
        files;

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
                develop: {
                server: {
                    file: 'bin/www'
                }
            },
            browserify: {
                dist: {
                    files: {
                        'public/js/purplellama.home.js': ['app/js/home/**/*.js'],
                        'public/js/purplellama.mix.js': ['app/js/mix/**/*.js']
                    }
                }
            },
            copy: {
                assets: {
                    files: [
                        {
                            expand: true,
                            cwd: 'app/',
                            src: 'assets/**/*',
                            dest: 'public/'
                        }
                    ]
                },
                mixes: {
                    files: [
                        {
                            expand: true,
                            cwd: 'app/',
                            src: 'mixes/**/*',
                            dest: 'public/'
                        }
                    ]
                }
            },
            less: {
                dist: {
                    files: {
                        'public/css/style.css': 'app/less/purplellama.less'
                    }
                }
            },
            watch: {
                options: {
                    nospawn: true,
                    livereload: reloadPort
                },
                server: {
                    files: [
                      'bin/www',
                      'app.js',
                      'routes/*.js'
                    ],
                    tasks: ['develop', 'delayed-livereload']
                },
                js: {
                    files: ['app/js/**/*.js'],
                    options: {
                        livereload: reloadPort
                    },
                    tasks: ['browserify']
                },
                css: {
                    files: [
                        'app/less/*.less'
                    ],
                    tasks: ['less'],
                    options: {
                        livereload: reloadPort
                    }
                },
                views: {
                    files: ['views/*.jade'],
                    options: {
                        livereload: reloadPort
                     }
                }
            }
        });

    grunt.config.requires('watch.server.files');
    files = grunt.config('watch.server.files');
    files = grunt.file.expand(files);

    grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
        var done = this.async();
        setTimeout(function () {
            request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
                var reloaded = !err && res.statusCode === 200;

                if (reloaded) {
                    grunt.log.ok('Delayed live reload successful.');
                } else {
                    grunt.log.error('Unable to make a delayed live reload.');
                }
                done(reloaded);
            });
        }, 500);
    });

    grunt.registerTask('default', [
        'copy:assets',
        'copy:mixes',
        'less',
        'browserify',
        'develop',
        'watch'
    ]);

    grunt.registerTask('heroku:production', [
        'copy:assets',
        'copy:mixes',
        'less',
        'browserify'
    ]);
};
