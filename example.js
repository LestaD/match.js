const match = require('./lib/match');

const a = match('hello', {
  hello: 100,
  world: 200,
}, 300);

console.log(a);
