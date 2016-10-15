'use strict';

var utils = require('./utils');
var ascii = require('./ascii');

var RSA = {};

RSA._selectKeyPair = function (num1, num2) {
	var pair = [];
	var n = num1 * num2;
	// var phiN = (num1-1)*(num2-1)
	var phiN = utils.totient(num1 * num2, [num1, num2]);
	var e = [];
	var d = [];

	for (var i = 1; i < phiN; i++) {
		if (utils.gcd(i, phiN) === 1) {
			e.push(i)
		}
	}



	for (var i = 0; i < e.length; i++) {
		for (var j = 1; j < phiN; j++) {
			if ( (e[i]*j) % phiN === 1 ) {
				d.push(j)
			}
		}
	}


	// d = e.map(function(prime) {
	// 	return (1% phiN) / prime;
	// }).filter(function(num) {
	// 	return Number.isInteger(num)
	// })


// 1. Choose two very large random prime integers:
// p and q
// 2. Compute n and φ(n):
// n = pq and φ(n) = (p-1)(q-1)
// 3. Choose an integer e, 1 < e < φ(n) such that:
// gcd(e, φ(n)) = 1(where gcd means greatest common denominator)
// 4. Compute d, 1 < d < φ(n) such that:
// ed ≡ 1 (mod φ(n))




	// console.log('phiN', utils.totient(187, [11, 17]))
	return [e[4], d[4]];
};

RSA.generateKeys = function (num1, num2) {
	var pair = RSA._selectKeyPair(num1, num2)
	var key = {
		public: num1*num2 + ':' + pair[0],
		private: num1*num2 + ':' + pair[1]
	}
	return key
};

RSA.encrypt = function (key, message) {







};

RSA.decrypt = function () {};

module.exports = RSA;
