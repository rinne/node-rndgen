'use strict';

const crypto = require('crypto');

var RndGen = function(key) {
	if (! key) {
		this.key = null;
	} else if (typeof(key) === 'string') {
		this.key = key;
		this.seq = 0;
		this.buf = Buffer.alloc(0);
	} else {
		throw new Error('Bad key type');
    }
};

RndGen.prototype.getBytes = function(n) {
	var r;
	if (this.key) {
		while (this.buf.length < n) {
			this.buf = Buffer.concat([ this.buf, 
									   (crypto
										.createHmac('sha512', this.key)
										.update(((this.seq++).toFixed(0)))
										.digest('buffer')) ]);
		}
		r = this.buf.slice(0, n);
		this.buf = this.buf.slice(n);
	} else {
		r = crypto.randomBytes(n);
	}
	return r;
};

RndGen.prototype.getInt = function(n) {
    var b, r;
    if ((n === undefined) || (n === null)) {
		n = 9007199254740991;
    }
    if (! (Number.isSafeInteger(n) && (n >= 0) && (n <= 9007199254740991))) {
		throw new Error("Bad limit");
    }
    b = this._bl(n);
    do {
		r = this._rb(b);
    } while(r > n);
    return r;
};

RndGen.prototype.rand = function(n) {
	return ((this.getInt(9007199254740991)) / 9007199254740992);
};

RndGen.prototype._rb = function(b) {
    var d, h, l;
    if (Number.isSafeInteger(b)) {
		if ((b >= 1) && (b <= 32)) {
			d = this.getBytes(4);
			l = d.readUInt32LE(0);
			return (l >>> (32 - b));
		} else if ((b >= 33) && (b <= 53)) {
			d = this.getBytes(8);
			l = d.readUInt32LE(0);
			h = d.readUInt32LE(4);
			return (((h >>> (64 - b)) * 4294967296) + l);
		} else if (b == 0) {
			return 0;
		}
    }
    throw new Error('Bad number of bits');
};

RndGen.prototype._bl = function(n) {
    var r;
    for (r = 0; n > 0; r++) {
		n = Math.trunc(n / 2);
    }
    return r;
};

(function(M, m) {
    if (M !== 9007199254740991) {
        throw new Error('Unexpected Number.MAX_SAFE_INTEGER');
    }
    if (m !== -9007199254740991) {
        throw new Error('Unexpected Number.MIN_SAFE_INTEGER');
    }
})(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

module.exports = RndGen;
