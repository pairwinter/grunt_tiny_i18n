# grunt_tiny_i18n

This is a tiny tool that covert the views files with sepecial i18n json data.you could config to generate the i18n json data to js files with the wrapper of Angular.factory or Commonjs or just the unicode json files.

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
            offset_i18n_name:-1,
            js_wrapper:{
                name:'angular', // angular,commonjs,json
                appName:'snow',
                i18nFactoryName:'i18n'
            },
            js_dest:'tmp/js_i18n_angular/'
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

#### options.offset_i18n_name
Type:`Number`
Scope: 1 or -1
Default vlaue:1
The position of i18nName.
1:after the dest, "./tmp/views"+"/"+i18nName+"{,**/}*.html";
-1:befroe the file, "./tmp/views"+"{,**/}"+i18nName+"/*.html";

#### options.js_wrapper
Type: `String` or `Object` or undefind
Default value: `undefind`

Be used to decide weather covert the i18n json data to js files, it should be used with js_dest.

#### options.js_dest
Type: `String`
Default value: `'.'`

The dest to place the i18n js , used with js_wrapper.

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

2014-8-11       v0.2.0      add the new option offset_i18n_name
