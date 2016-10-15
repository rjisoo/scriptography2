'use strict';

var base64 = require('./base64');

var random = {};

random.integer = function (min, max) {
  if (arguments.length < 2) {
    return random.integer(0, ...arguments);
  }
  const range = (1 + max - min);
  const randInt = min + Math.floor(Math.random() * range);
  return randInt;
};

var charSet = base64._charSet;
random.base64 = function (size) {
  let randStr = '';
  while (size--) {
    randStr += charSet[random.integer(0, 63)];
  }
  return randStr;
};

module.exports = random;
