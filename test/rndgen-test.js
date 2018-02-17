'use strict';

const RndGen = require('../rndgen.js');
const assert = require('assert');
const LOOP_LEN = 5000;

(function() {
	var i, x, y, rg1, rg2;
	rg1 = new RndGen();
	for (i = 0; i < LOOP_LEN; i++) {
		x = rg1.getBytes(10)
		assert.ok(Buffer.isBuffer(x) && (x.length == 10));
		x = rg1.getInt();
		assert.ok(Number.isSafeInteger(x) && (x >= 0) && (x <= Number.MAX_SAFE_INTEGER));
		x = rg1.getInt(999999)
		assert.ok(Number.isSafeInteger(x) && (x >= 0) && (x <= 999999));
		x = rg1.rand();
		assert.ok((typeof(x) === 'number') && (x >= 0) && (x < 1.0));
	}
	rg1 = new RndGen('the secret of the all secrets');
	rg2 = new RndGen('the secret of the all secrets');
	for (i = 0; i < LOOP_LEN; i++) {
		x = rg1.getBytes(10)
		y = rg2.getBytes(10)
		assert.ok(Buffer.isBuffer(x) && (x.length == 10));
		assert.ok(x.compare(y) == 0);
		x = rg1.getInt();
		y = rg2.getInt();
		assert.ok(Number.isSafeInteger(x) && (x >= 0) && (x <= Number.MAX_SAFE_INTEGER));
		assert.ok(x === y);
		x = rg1.getInt(999999)
		y = rg2.getInt(999999)
		assert.ok(Number.isSafeInteger(x) && (x >= 0) && (x <= 999999));
		assert.ok(x === y);
		x = rg1.rand();
		y = rg2.rand();
		assert.ok((typeof(x) === 'number') && (x >= 0) && (x < 1.0));
		assert.ok(x === y);
	}
})();

process.exit(0);
