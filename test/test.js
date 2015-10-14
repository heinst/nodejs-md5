var md5 = require('../index.js');
var assert = require('assert');

md5.file('./test/testfile.txt' , function(md) {
    assert.equal(md, "MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214");
});

md5.file.quiet('./test/testfile.txt', function(md) {
    assert.equal(md, "f0ffb8dbde05931dfb9baeee5c86b214");
});

md5.file.reverse('./test/testfile.txt', function(md) {
    assert.equal(md, "f0ffb8dbde05931dfb9baeee5c86b214 testfile.txt");
});

md5.files(['./test/testfile.txt', './test/anotherTestFile.txt'], function(md) {
    assert.equal(md[0], "MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214");
    assert.equal(md[1], "MD5 (anotherTestFile.txt) = 59a8935a0ac35991c27f29d4f25ea8b9");
});

md5.files.quiet(['./test/testfile.txt', './test/anotherTestFile.txt'], function(md) {
    assert.equal(md[0], "f0ffb8dbde05931dfb9baeee5c86b214");
    assert.equal(md[1], "59a8935a0ac35991c27f29d4f25ea8b9");
});

md5.files.reverse(['./test/testfile.txt', './test/anotherTestFile.txt'], function(md) {
    assert.equal(md[0], "f0ffb8dbde05931dfb9baeee5c86b214 testfile.txt");
    assert.equal(md[1], "59a8935a0ac35991c27f29d4f25ea8b9 anotherTestFile.txt");
});

assert.equal(md5.string("Hello, world"), "MD5 (\"Hello, world\") = bc6e6f16b8a077ef5fbc8d59d0b931b9");
assert.equal(md5.string.quiet("Hello, world"), "bc6e6f16b8a077ef5fbc8d59d0b931b9");
assert.equal(md5.string.reverse("Hello, world"), "bc6e6f16b8a077ef5fbc8d59d0b931b9 \"Hello, world\"");