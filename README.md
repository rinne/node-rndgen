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

RndGen()
--------

Constructor for undeterministic random class. All functions called
using an instance created like this, return non-reproducible data.

RndGen(key)
-----------

Constructor for deterministic random class. All call chains to class
functions using an instance created like this produce a deterministic
return data that can be reproduced using the same key and same call
chain.

RndGen.prototype.getBytes(bytes)
--------------------------------

Return a Buffer of random bytes. Number of bytes passed as an
argument.


RndGen.prototype.getInt(max)
----------------------------

Return a random integer in range 0..max inclusively. The limit must be
nonnegative and a safe integer. If max argument is omitted, it
defaults to Number.MAX_SAFE_INTEGER.

RndGen.prototype.rand()
-----------------------

Retrurn a random number x greater or equal to 0 but less than 1.

Because of javascript number type, rand() function can return 2^53
different values and of course they can be enumerated. You'd be
very lucky to see any of these particular ones, but rest assured,
it is possible that any of those pop up. One that absolutely does
NOT pop out is 1.00000000000000000000.

```
// 1                0.00000000000000000000
// 2                0.00000000000000011102
// 3                0.00000000000000022204
// 4                0.00000000000000033307
// 5                0.00000000000000044409
// 6                0.00000000000000055511
// 7                0.00000000000000066613
// 8                0.00000000000000077716
// 9                0.00000000000000088818
// 10               0.00000000000000099920
//                  .
//                  .
//                  .
// 9007199254740982 0.99999999999999877875
// 9007199254740983 0.99999999999999888978
// 9007199254740984 0.99999999999999900080
// 9007199254740985 0.99999999999999911182
// 9007199254740986 0.99999999999999922284
// 9007199254740987 0.99999999999999933387
// 9007199254740988 0.99999999999999944489
// 9007199254740989 0.99999999999999955591
// 9007199254740990 0.99999999999999966693
// 9007199254740991 0.99999999999999977796
// 9007199254740992 0.99999999999999988898
```

Author
======

Timo J. Rinne <tri@iki.fi>


License
=======

GPL-2.0
