var should = require('should');
var m = process.env.COVERAGE
  ? require('../coverage/match')
  : require('../lib/match');

describe('match', function() {
  it('has match()', function() {
    should(m.match).be.a.Function;
    should(m.default).be.a.Function;
    should(m.match).be.equal(m.default);
  });

  it('simple match', function() {
    should(m.match('one', { one: true })).be.equal(true);
  });

  it('simple match multiple', function() {
    should(m.match('one', { one: true, se: false })).be.equal(true);
  });

  it('simple match default', function() {
    should(m.match('def', { one: true }, 'wow')).be.equal('wow');
  });

  it('null by default', function() {
    should(m.match('any', {})).be.equal(null);
  });

  it('match undefined', function() {
    should(m.match(undefined, {
      undefined: true,
    })).be.equal(true);
  });

  it('call function', function() {
    should(m.match('e', {
      e: function(){ return true }
    })).be.equal(true);
  });

  it('call function by default', function() {
    should(m.match('e', {}, function(){ return true })).be.equal(true);
  });

  it('get null without variants', function() {
    should(m.match('asd')).be.equal(null);
  });
});

describe('matchType', function() {
  it('has matchType()', function() {
    should(m.matchType).be.a.Function;
    should(m.matchType).not.be.equal(m.default);
  });

  it('string match', function() {
    should(m.matchType('one', { string: true })).be.equal(true);
  });

  it('number match', function() {
    should(m.matchType(1, { number: true })).be.equal(true);
    should(m.matchType(1.2, { number: true })).be.equal(true);
    should(m.matchType(0, { number: true })).be.equal(true);
    should(m.matchType(-900, { number: true })).be.equal(true);
    should(m.matchType(0xF, { number: true })).be.equal(true);
  });

  it('bool match', function() {
    should(m.matchType(false, { boolean: true })).be.equal(true);
    should(m.matchType(true, { boolean: true })).be.equal(true);
  });

  it('object match', function() {
    should(m.matchType({}, { object: true })).be.equal(true);
    should(m.matchType(new Promise(function(){}), { object: true })).be.equal(true);
  });

  it('array match', function() {
    should(m.matchType([], { array: true })).be.equal(true);
    should(m.matchType([1, 2, 3], { array: true })).be.equal(true);
  });

  it('function match', function() {
    should(m.matchType(function(){}, { function: true })).be.equal(true);
  });

  it('undefined match', function() {
    should(m.matchType(undefined, { undefined: true })).be.equal(true);
    var s;
    should(m.matchType(s, { undefined: true })).be.equal(true);
  });

  it('default match', function() {
    should(m.matchType('one', {})).be.equal(null);
    should(m.matchType('one', {}, true)).be.equal(true);
  });

  it('get null without variants', function() {
    should(m.matchType('asd')).be.equal(null);
  });
});


describe('matchStrict', function() {
  it('has matchStrict()', function() {
    should(m.matchStrict).be.a.Function;
    should(m.matchStrict).not.be.equal(m.default);
  });

  it('must be defined default and variants', function() {
    should.throws(function(){
      m.matchStrict('a')
    });
    should.throws(function(){
      m.matchStrict('a', {})
    });
    should.doesNotThrow(function(){
      m.matchStrict('a', {}, null);
    })
  });

  it('simple match', function() {
    should(m.matchStrict('one', { one: true }, false)).be.equal(true);
  });

  it('another match', function() {
    should(m.matchStrict('one', { one: true, sec: false }, false)).be.equal(true);
  });

  it('default', function() {
    should(m.matchStrict('sec', { one: false }, true)).be.equal(true);
  });

  it('return function', function() {
    should(m.matchStrict('one', { one: function(){} }, false)).be.Function;
  });

  it('return default function', function() {
    should(m.matchStrict('sec', { one: false }, function(){})).be.Function;
  });
});

describe('matchRegexp', function() {
  it('has matchRegexp()', function() {
    should(m.matchRegexp).be.a.Function;
    should(m.matchRegExp).be.a.Function;
    should(m.matchRegexp).not.be.equal(m.default);
    should(m.matchRegexp).be.equal(m.matchRegExp);
  });

  it('simple match', function() {
    should(m.matchRegExp('value', {
      '^val': true,
    })).be.equal(true);

    should(m.matchRegExp('value', {
      '^value$': true,
    })).be.equal(true);

    should(m.matchRegExp('value', {
      '^[a-z]+$': true,
    })).be.equal(true);
  });

  it('match second', function() {
    should(m.matchRegexp('random', {
      '^val': false,
      '^random$': true,
    })).be.equal(true);
  });

  it('default', function() {
    should(m.matchRegexp('s', {}, true)).be.equal(true);
  });

  it('flags pass', function() {
    should(m.matchRegExp('Wow', {
      'wow': true,
    }, false, 'i')).be.equal(true);
    should(m.matchRegExp('Wow', {
      'wow': false,
    }, true, '')).be.equal(true);
  });
});
