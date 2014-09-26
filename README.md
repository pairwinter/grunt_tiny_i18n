# grunt_tiny_i18n

This is a tiny tool that covert the views files with sepecial i18n json data.
you could config to generate the i18n json data to js files with the wrapper of Angular.provider or Commonjs or just the unicode json files.

```eg. use en_US.json
convert /user/info.html --> /user/en_US/info.html
build   en_US.json      --> static/javascript/i18n/en_US.js

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt_tiny_i18n --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt_tiny_i18n');
```

## The "tiny_i18n" task

### Overview
In your project's Gruntfile, add a section named `tiny_i18n` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    tiny_i18n: {
        options: {
            offset:-1,
            buildJS:{
                type:'angular', // angular,commonjs,json
                appName:'snow', // if type is 'angular', this value should be assigned.
                providerName:'i18n',// if type is 'angular', this value should be assigned.
                dest:'tmp/js_i18n_angular/' //the local where you place builded js files.
            }
        },
        your_options:{
            i18n:['test/fixtures/i18n/en_US.json','test/fixtures/i18n/zh_CN.json'],
            expand:true,
            cwd:'test/fixtures/',
            src:['htmls/{,**/}*.html'],
            dest:"./tmp/views"
        }
    }
});
```

### Options

#### options.offset
Type:`Number`
Scope: 1 or -1
Default vlaue:1
The position of i18nName.
1:after the dest, "./tmp/views"+"/"+i18nName+"{,**/}*.html";
-1:befroe the file, "./tmp/views"+"{,**/}"+i18nName+"/*.html";

#### options.buildJS
Type: `Object` or undefind
Default value: `undefind`

Be used to decide weather covert the i18n json data to js files, it should be used with dest.

### your_options

#### src
Type : `Array<String>`

convert the pages with the i18n json files, and put them into separeted folders named with county id, e.g en_US.

#### i18n
Type : `Array<String>`

The i18n json files that to be used.

#### dest
Type : `String`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
```
2014-9-26       v0.3.0      optimize the structure of configuration.
```
2014-9-25       v0.2.6      optimize the code for provider, the provider could offer current language,i18n content,and a function named parseUrl to parse the offer url to ****/LanguageName/*.html(js)
```
2014-9-24       v0.2.4      change anguar i18n service from factory to provider.
```
2014-8-11       v0.2.0      add the new option offset_i18n_name.
