'use strict';

var base64 = require('./base64');
var ascii = require('./ascii');
var utils = require('./utils');

var hash = {};

hash.simple = {};

hash.simple._pad = function (str, size) {
  let paddedStr = str;
  const reverse = str.split('').reverse().join('');
  while (paddedStr.length < size) {
    paddedStr += reverse;
  }
  return paddedStr;
};

hash.simple._partition = function (str, size) {
  const partitions = [];
  for (let i = 0; i < str.length; i += size) {
    partitions.push(str.substr(i, size));
  }
  return partitions;
};

hash.simple._combine = function (strA, strB) {
  if (strB.length > strA.length) {
    return hash.simple._combine(strB, strA);
  }
  const digitsA = base64.toDigits(strA);
  const digitsB = base64.toDigits(strB);
  const combinedDigits = digitsA.map(function (digitA, index) {
    const digitB = digitsB[index];
    return digitA ^ digitB;
  });
  const combined = base64.fromDigits(combinedDigits);
  return combined;
};

hash.simple.run = function (asciiStr, size) {
  const b64str = utils.asciiToBase64(asciiStr);
  const padded = hash.simple._pad(b64str, size * 2);
  const partitions = hash.simple._partition(padded, size);
  const combined = partitions.reduce(hash.simple._combine);
  return combined;
};

hash.hmac = function (hasher, key, message, size) {
  if (arguments.length < 4) {
    return hash.hmac(hash.simple.run, ...arguments);
  }
  return hasher(key + message, size);
};

hash.pbkdf2 = function (hasher, message, salt, iterations, size) {
  if (arguments.length < 5) {
    return hash.pbkdf2(hash.simple.run, ...arguments);
  }
  let digest = message;
  while (iterations--) {
    digest = hash.hmac(hasher, salt, digest, size);
  }
  return digest;
};

module.exports = hash;
