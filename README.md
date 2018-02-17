In a Nutshell
=============

A class library returning random data, random integers, and random
floating point number either using crypto as source, or
deterministically deriving a sequence from sha512 hash function using
the caller submitted key.

Reference
=========

```
const RndGen = require('rndgen');

var rg = new RndGen(); // Non-deterministic instance
rg.getBytes(10);       // 10 bytes of random data in Buffer
rg.getInt();           // random integer 0..9007199254740991 inclusively
rg.getInt(42)          // random integer 0..42 inclusively
rg.rand()              // random number 0.0 <= x < 1.0

var rg = new RndGen('secret key!'); // Deterministic instance
// Same interfaces are available.  Same key and same call order
// produces same sequence of return values.
```


Author
======

Timo J. Rinne <tri@iki.fi>


License
=======

GPL-2.0
