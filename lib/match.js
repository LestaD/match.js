
module.exports.default = match;
module.exports.match = match;
module.exports.matchType = matchType;
module.exports.matchRegexp = matchRegexp;
module.exports.matchRegExp = matchRegexp;

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
function match(target, variants = {}, def = null) {
  function callOrReturn(value) {
    return typeof value === 'function'
      ? value()
      : value;
  }

  return callOrReturn(
    typeof variants[target] !== 'undefined'
      ? variants[target]
      : def
  );
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
function matchType(target, variants = {}, def = null) {
  return match(typeof target, variants, def);
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
  if (typeof variants !== 'object') throw new Error('Variants must be object');
  if (typeof def === 'undefined') throw new Error('Default value cannot be undefined');

  return typeof variants[target] !== 'undefined'
    ? variants[target]
    : def;
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
function matchRegexp(target, variants, def, flags = 'igm') {
  const list = Object.keys(variants);
  const value = String(target);

  for (let id = 0, rxp = list[id]; id < list.length; id++) {
    const tester = new RegExp(rxp, flags);
    console.log(rxp, tester.test(target));
  }
}
