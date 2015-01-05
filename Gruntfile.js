module.exports = function ( grunt ) {

    'use strict';

    grunt.initConfig({
        jsbeautifier : {
            files : ['src/**/*.js','!src/vendor/**/*.js'],
            options : {
            }
        },
        watch: {
            js: {
                files: ['Gruntfile.js','bower.js','src/**/*.js'],
                tasks: ['jsbeautifier', 'jshint', 'uglify', 'injector']
            },
            css: {
                files: ['src/styles/sass/*.sass'],
                tasks: ['compass']
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/styles/sass',
                    cssDir: 'dist/styles/css'
                }
            }
        },
        jshint: {
            all: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'Gruntfile.js',
                    'bower.js',
                    'src/scripts/**/*.js',
                    'test/**/*.js',
                    '!node_modules/**/*.js',
                    '!src/vendor/**/*.js',
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/script/base.min.js': [
                        'src/vendor/jquery/dist/jquery.min.js',
                        'src/vendor/jquery/dist-ui/jquery-ui.min.js',
                        'src/vendor/angular/angular.min.js',
                        'src/vendor/angular-route/angular-route.min.js',
                        'src/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'src/vendor/angular-ui-router/release/angular-ui-router.min.js',
                        'src/vendor/angular-ui-tree/dist/angular-ui-tree.min.js',
                        'src/vendor/countUp.js/countUp.js',
                        'src/vendor/moment/moment.js',
                        'src/vendor/moment/locale/pt-br.js',
                        'src/vendor/angular-moment/angular-moment.min.js',                        
                    ],
                    'dist/script/app.min.js': [
                        'src/scripts/ngApp.js',
                        'src/scripts/ngRoutes.js',
                        'src/scripts/ngConfig.js',
                        'src/scripts/**/*js'
                    ]
                }
            }
        },
        injector: {
            options: {},
            app: {
                files: {
                    'debug.html' : [
                        'src/vendor/jquery/dist/jquery.min.js',
                        'src/vendor/jquery/dist-ui/jquery-ui.min.js',
                        'src/vendor/angular/angular.min.js',
                        'src/vendor/angular-route/angular-route.min.js',
                        'src/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'src/vendor/angular-ui-router/release/angular-ui-router.min.js',
                        'src/vendor/countUp.js/countUp.js',
                        'src/vendor/moment/moment.js',
                        'src/vendor/moment/locale/pt-br.js',
                        'src/vendor/angular-moment/angular-moment.min.js',
                        'src/scripts/ngApp.js',
                        'src/scripts/ngRoutes.js',
                        'src/scripts/ngConfig.js',
                        'src/scripts/**/*js',

                        /*--CSS--*/
                        'dist/styles/css/main.css',
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-injector');

    grunt.registerTask( 'default', [ 'watch' ] );
    grunt.registerTask( 'build', [ 'jshint', 'uglify', 'compass', 'injector' ] );
    grunt.registerTask( 'bootstrap', [ 'jshint', 'uglify', 'compass', 'injector', 'watch' ] );
};