'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.tiny_i18n = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    angular_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/js_i18n_angular/en_US.js');
        var expected = grunt.file.read('test/expected/js_i18n_angular/en_US.js');
        test.equal(actual, expected, 'should describe what the angular_options behavior is.');

        test.done();
    },
    commonjs_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/js_i18n_commonjs/en_US.js');
        var expected = grunt.file.read('test/expected/js_i18n_commonjs/en_US.js');
        test.equal(actual, expected, 'should describe what the commonjs_options behavior is.');

        test.done();
    },

    json_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/js_i18n_json/en_US.json');
        var expected = grunt.file.read('test/expected/js_i18n_json/en_US.json');
        test.equal(actual, expected, 'should describe what the json_options behavior is.');

        test.done();
    }
};
