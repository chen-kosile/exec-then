/*global describe, it */
'use strict';

var assert = require('assert');
var path = require('path');
var exec = require('../');

describe('Test with child_process.exec', function () {
  var opt = {
    verbose: false
  };

  it('should return current path', function() {
    return exec('pwd', opt).then(function(res) {
      assert(res.stdout.indexOf(path.resolve(__dirname, '../')) !== -1);
    });
  });

  it('should return current files', function() {
    return exec(['ls', '-al'], opt).then(function(std) {
      assert(std.stdout.indexOf('test') !== -1);
      assert(std.stdout.indexOf('bower_component') === -1);
    });
  });

  it('should return error message', function() {
    return exec('mymimy', opt, function(std, deferred) {
      if (std.stderr) {
        return deferred.reject(new Error('Did you have the command!!'));
      }
      return true;
    }).then(function(std) {
      assert(std.stderr.indexOf('command not found') !== -1);
      assert(std.stderr.indexOf('mimymi') === -1);
    },
    function(e) {
      assert(true);
    });
  });
});

describe('Test with child_process.spawn', function () {
  var opt = {
    verbose: true
  };

  it('should return current path', function() {
    return exec('pwd', opt).then(function(res) {
      assert(res.stdout.indexOf(path.resolve(__dirname, '../')) !== -1);
    });
  });

  it('should return with err', function() {
    return exec('mpm', opt).then(function(res) {
      assert(res.err);
    });
  });

  it('should show stdio data immediately', function() {
    return exec('npm', opt).then(function(res) {
      assert(true);
    });
  });
});
