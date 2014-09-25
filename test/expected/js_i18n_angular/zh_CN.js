angular.module('snow').provider('i18n', function () { var i18n = this.i18n = {"username":"\u7528\u6237\u540d","userpassword":"\u7528\u6237\u5bc6\u7801"};var language = this.language="zh_CN";var parseUrl = this.parseUrl = function (url) {
                    if (url) {
                        var last = url.lastIndexOf("/");
                        if (last > -1) {
                            var first = url.substring(0, last);
                            var second = url.substring(last);
                            return first + language + second;
                        }
                    }
                    return url;
                };this.$get = function(){return {i18n:i18n,language:language,parseUrl:parseUrl}}});