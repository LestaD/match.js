

function callOrReturn(value) {
  return typeof value === 'function'
    ? value()
    : value;
}

module.exports = match;
module.exports.default = match;
module.exports.match = match;
module.exports.matchType = matchType;

function match(value, variants = {}, def = null) {
  return callOrReturn(
    typeof variants[value] !== 'undefined'
      ? variants[value]
      : def
  );
}

function matchType(target, variants = {}, def = null) {
  return match(typeof target, variants, def);
}

function matchStrict(target, variants, def) {
  if (typeof variants !== 'object') throw new Error('Variants must be object');
  if (typeof def === 'undefined') throw new Error('Default value cannot be undefined');


}
