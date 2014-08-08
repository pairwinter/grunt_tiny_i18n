/*
 * tiny_i18n
 * https://github.com/pairwinter/grunt_tiny_i18n
 *
 * Copyright (c) 2014 Damon Liu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        tiny_i18n: {
            angular_options: {
                options: {
                    js_wrapper:{
                        name:'angular', // angular,commonjs,json
                        appName:'snow',
                        i18nFactoryName:'i18n'
                    },
                    js_dest:'tmp/js_i18n_angular/'
                },
                i18n:['test/fixtures/i18n/en_US.json','test/fixtures/i18n/zh_CN.json'],
                expand:true,
                cwd:'test/fixtures/',
                src:['htmls/{,**/}*.html'],
                dest:"./tmp/views"
            }
            ,commonjs_options: {
                options: {
                    js_wrapper:{
                        name:'commonjs' // angular,commonjs,json
                    },
                    js_dest:'tmp/js_i18n_commonjs/'
                },
                i18n:['test/fixtures/i18n/en_US.json','test/fixtures/i18n/zh_CN.json'],
                expand:true,
                cwd:'test/fixtures/',
                src:['htmls/{,**/}*.html'],
                dest:"./tmp/views/"
            }
            ,json_options: {
                options: {
                    js_wrapper:{
                        name:'json' // angular,commonjs,json
                    },
                    js_dest:'tmp/js_i18n_json/'
                },
                i18n:['test/fixtures/i18n/en_US.json','test/fixtures/i18n/zh_CN.json'],
                expand:true,
                cwd:'test/fixtures/',
                src:['htmls/{,**/}*.html'],
                dest:"./tmp/views"
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-filerev');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
//    grunt.registerTask('test', ['clean', 'tiny_i18n:commonjs_options']);
    grunt.registerTask('test', ['clean', 'tiny_i18n', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
