'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.match = match;
exports.matchType = matchType;
exports.matchStrict = matchStrict;
exports.matchRegexp = matchRegexp;

/**
 * Find target by key in variants.
 * If function founded, call it and result which returns
 * If not founded return def (`null` if not defined)
 *
 * @param  {Any} target        Value of any type to match
 * @param  {Object} variants   Hash of values with match by key
 * @param  {Any} def           Value return by default if no one key is matched
 * @return {Any}               Matched value or default
 */
exports.default = match;
function match(target) {
  var variants = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var def = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  function callOrReturn(value) {
    return typeof value === 'function' ? value() : value;
  }

  return callOrReturn(variants.hasOwnProperty(target) ? variants[target] : def);
}

/**
 * Get `typeof` target and find `number`, `string`, `boolean` etc. in variants
 * If function founded call it and return it's result
 * If no founded return def (`null` if not defined)
 *
 * @param  {Any} target        Value of any type to match
 * @param  {Object} variants   Hash of values with match by key
 * @param  {Any} def           Value return by default if no one key is matched
 * @return {Any}               Matched value or default
 */
function matchType(target) {
  var variants = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var def = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var type = typeof target === 'undefined' ? 'undefined' : _typeof(target);
  if (Array.isArray(target)) {
    type = 'array';
  }

  return match(type, variants, def);
}

/**
 * Find target in variants by key and return it
 * Not call if function founded
 * If no founded return def (`null` if not defined)
 *
 * @param  {Any} target        Value of any type to match
 * @param  {Object} variants   Hash of values with match by key
 * @param  {Any} def           Value return by default if no one key is matched
 * @return {Any}               Matched value or default
 */
function matchStrict(target, variants, def) {
  if ((typeof variants === 'undefined' ? 'undefined' : _typeof(variants)) !== 'object') throw new Error('Variants must be object');
  if (typeof def === 'undefined') throw new Error('Default value cannot be undefined');

  return variants.hasOwnProperty(target) ? variants[target] : def;
}

/**
 * Find first matched regexp and return it's value in variants
 * If not founded return def
 *
 * @param  {Any} target        Value of any type to match
 * @param  {Object} variants   Hash of values with regExps as keys
 * @param  {Any} def           Value return by default if no one key is matched
 * @return {Any}               Matched value or default
 */
var matchRegExp = exports.matchRegExp = matchRegexp;
function matchRegexp(target, variants, def) {
  var flags = arguments.length <= 3 || arguments[3] === undefined ? 'igm' : arguments[3];

  var list = Object.keys(variants);
  var value = String(target);

  for (var id = 0; id < list.length; id++) {
    var rxp = list[id];
    var tester = new RegExp(rxp, flags);
    if (tester.test(target)) {
      return variants[rxp];
    }
  }
  return def;
}

