var md5 = require('../index.js');
var assert = require('assert');
md5.file('./test/testfile.txt', 'md5', function(md) {
    assert.equal(md, "f0ffb8dbde05931dfb9baeee5c86b214");
});
assert.equal(md5.string("Hello, world"), "bc6e6f16b8a077ef5fbc8d59d0b931b9");
