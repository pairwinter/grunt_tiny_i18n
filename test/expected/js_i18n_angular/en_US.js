angular.module('snow',[]).provider('i18n', function () { var i18n = this.i18n = {"username":"User Name","userpassword":"User Password"};var language = this.language="en_US";var parseUrl = this.parseUrl = function (url) {
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
                };this.$get = function(){return {i18n:i18n,language:language,parseUrl:parseUrl}}});