/*
 * tiny_i18n
 * https://github.com/pairwinter/grunt_tiny_i18n
 *
 * Copyright (c) 2014 Damon Liu
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var _ = require('underscore');
module.exports = function (grunt) {

    function unicode(str) {

        var newStr = str.replace(/[^\u0000-\u007f]/ig, function (s) {
            var value = ("\\u" + (parseInt(s.charCodeAt(0))).toString(16));
            return value;
        });
        return newStr;
    }

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('tiny_i18n', 'The best Grunt plugin ever.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({});
        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            var i18nFiles = f.i18n;
            var i18nJsons = {};
            var offset = options.offset || 1;
            i18nFiles.forEach(function (i18nFilePath) {
                grunt.log.writeln(('Read i18n json File "' + i18nFilePath).blue);
                var i18nName = path.basename(i18nFilePath, '.json');
                var json = grunt.file.readJSON(i18nFilePath);
                i18nJsons[i18nName] = json;
            });
            // Concat specified files.
            var srcFiles = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });
            srcFiles.forEach(function (filepath) {
                // Read file source.
                var fileContent = grunt.file.read(filepath);
                _.forEach(i18nJsons, function (i18nJson, i18nName) {
                    var resultContent = grunt.template.process(fileContent, {data: i18nJson});
                    var newfilepath = f.orig.expand ? path.relative(f.orig.cwd || '', filepath) : filepath;

                    var destPath = f.orig.dest + path.sep;
                    if (offset == 1) {
                        destPath = destPath + i18nName + path.sep + newfilepath;
                    } else {
                        destPath = destPath + newfilepath;
                        var dirname = path.dirname(destPath);
                        var basename = path.basename(destPath);
                        destPath = dirname + path.sep + i18nName + path.sep + basename;
                    }
                    grunt.file.write(destPath, resultContent);
                });
            });
            if (options.buildJS) {
                var buildJS = options.buildJS;
                var js_dest = buildJS.dest;
                var parseUrl = function (url) {
                    if (url) {
                        var sep = "/";
                        var last = url.lastIndexOf(sep);
                        if (last > -1) {
                            var first = url.substring(0, last);
                            var second = url.substring(last);
                            return first +sep + language + second;
                        }
                    }
                    return url;
                }
                var angularTemplate = "angular.module('<%=appName%>',[]).provider(" +
                    "'<%=providerName%>', " +
                    "function () { " +
                        "var i18n = this.i18n = <%=strJson%>;" +
                        "var language = this.language=\"<%=i18nName%>\";" +
                        "var parseUrl = this.parseUrl = " + parseUrl.toString() + ";" +
                        "this.$get = function(){return {i18n:i18n,language:language,parseUrl:parseUrl}}" +
                    "}" +
                ");";
                var commonjsTemplate = "define(function(require,exports,module){return <%=strJson%>;});";
                var jsonTemplate = "<%=strJson%>";
                _.forEach(i18nJsons, function (i18nJson, i18nName) {
                    var strJson = unicode(JSON.stringify(i18nJson));
                    var resultContent = '';
                    var suffix = '.js';
                    if (buildJS.type == 'angular') {
                        resultContent = grunt.template.process(angularTemplate, {data: {i18nName:i18nName,appName: buildJS.appName, providerName: buildJS.providerName, strJson: strJson}});
                    } else if (buildJS.type == 'commonjs') {
                        resultContent = grunt.template.process(commonjsTemplate, {data: {strJson: strJson}});
                    } else {
                        resultContent = grunt.template.process(jsonTemplate, {data: {strJson: strJson}});
                        suffix = '.json';
                    }
                    grunt.file.write(js_dest + '/' + i18nName + suffix, resultContent);
                });
            }
            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
