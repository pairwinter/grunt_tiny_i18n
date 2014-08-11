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

    function unicode(str){

        var newStr = str.replace(/[^\u0000-\u007f]/ig,function(s){
            var value = ("\\u"+(parseInt(s.charCodeAt(0))).toString(16));
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
            var offsetI18nName = options.offset_i18n_name || 1;
            i18nFiles.forEach(function(i18nFilePath){
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
                var fileContent =  grunt.file.read(filepath);
                _.forEach(i18nJsons,function(i18nJson,i18nName){
                    var resultContent = grunt.template.process(fileContent,{data:i18nJson});
                    var newfilepath = f.orig.expand?path.relative(f.orig.cwd||'',filepath):filepath;

                    var destPath = f.orig.dest + path.sep;
                    if(offsetI18nName == 1){
                        destPath = destPath + i18nName + path.sep + newfilepath;
                    }else{
                        destPath = destPath + newfilepath;
                        var dirname = path.dirname(destPath);
                        var basename = path.basename(destPath);
                        destPath = dirname + path.sep + i18nName + path.sep + basename;
                    }
                    grunt.file.write(destPath, resultContent);
                });
            });
            if(options.js_wrapper && options.js_dest){
                var js_wrapper = options.js_wrapper;
                var js_dest = options.js_dest;
                var angularTemplate = "angular.module('<%=appName%>').factory('<%=i18nFactoryName%>', function () { return <%=strJson%>;});";
                var commonjsTemplate = "define(function(require,exports,module){return <%=strJson%>;});";
                var jsonTemplate="<%=strJson%>";
                _.forEach(i18nJsons,function(i18nJson,i18nName){
                    var strJson = [];
                    _.forEach(i18nJson,function(value,key){
                        i18nJson[key] = unicode(value);
                        strJson.push('\"'+key + '\":\"' + unicode(value) + '\"');
                    });
                    strJson = "{" + strJson.join(",") +"}";
                    var resultContent = '';
                    var suffix = '.js';
                    if(js_wrapper == 'angular' || js_wrapper.name == 'angular'){
                        resultContent = grunt.template.process(angularTemplate,{data:{appName:js_wrapper.appName,i18nFactoryName:js_wrapper.i18nFactoryName,strJson:strJson}});
                    }else if(js_wrapper == 'commonjs' || js_wrapper.name == 'commonjs'){
                        resultContent = grunt.template.process(commonjsTemplate,{data:{strJson:strJson}});
                    }else{
                        resultContent = grunt.template.process(jsonTemplate,{data:{strJson:strJson}});
                        suffix = '.json';
                    }
                    grunt.file.write(js_dest+'/'+i18nName+suffix, resultContent);
                });
            }
            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
