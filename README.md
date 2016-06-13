# Match.js

Match values like a Rust

## Install

```bash
npm install --save match.js
```

## Usage

### ES7:

```js
import match from 'match.js';
// or
import { match, matchType } from 'match.js';
```

### ES6:

```js
const match = require('match.js');

const P_INIT = 1;
const P_READY = 2;
const P_PENDING = 3;
const P_SUCCESS = 4;
const P_FAIL = 9;


const result = (function someFunction(){ return P_SUCCESS; })();

match(result, {
  [P_PENDING]() {
    console.info('Please, wait');
  },

  [P_SUCCESS]() {
    console.log('Success! Let\'s work.');
  },

  [P_FAIL](value, variants) {
    console.error(`Failed with ${value}`, variants);
  }
}, () => console.warning('Default isn\t present')); // default value

// Success! Let's work.
```


### ES5:

```js
var match = require('match.js');

var source = 'value';
var target = match.matchType(source, {
  number: 5 + 12,
  string: 'some',
  function: function(){ return function(){} },
  boolean: false,
}, 'default');

console.log(target); // some
```



## Example

```js
import match, { matchType, matchStrict, matchRegexp } from 'match.js';

// match by value, default is `null`
const result = match(20, {
  10: 'first',
  20: () => match('string', {
    string: 200
  })
});

console.log(result); // 200

// match by type, default is `default`
const result2 = matchType('hello', {
  string: 'that string',
  number: 'that number',
}, 'default');

console.log(result2); // that string


// Do not call function
const result3 = matchStrict('our', {
  your: function() { return 11; },
  my: function() { return 22; },
  our: function() { return 33; },
});

console.log(result3); // function() { return 33; }
console.log(result3()); // 33


const result4 = match('second', {
  first: 1,
  second: function() {
    return 2;
  }
});

console.log(result4); // 2


const result5 = matchRegexp('hi all', {
  '^[a-z]+': true
}, false, 'i');
```
