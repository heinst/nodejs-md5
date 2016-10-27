# nodejs-md5  ![Version][version] [![Build Status](https://travis-ci.org/heinst/nodejs-md5.svg)](https://travis-ci.org/heinst/nodejs-md5) ![Coverage Status][coveralls] ![Total Downloads][total]

A simple node module to give you the MD5 of a file or string.
Mimics the macOS command `md5`.

##To install:

```bash
npm install nodejs-md5
```

##To import:

```JavaScript
var md5 = require("nodejs-md5");
```

##Example Usage:

####To get the MD5 of a file:

```JavaScript
//md5 ./test/testfile.txt
md5.file("./test/testfile.txt", function(err, md5) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5); //"MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214"
    }
});
```

```JavaScript
//md5 -q ./test/testfile.txt
md5.file.quiet("./test/testfile.txt", function(err, md5) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5); //'f0ffb8dbde05931dfb9baeee5c86b214'
    }
});
```

```JavaScript
//md5 -r ./test/testfile.txt
md5.file.quiet("./test/testfile.txt", function(err, md5) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5); //'f0ffb8dbde05931dfb9baeee5c86b214 file.txt'
    }
});
```

####To get the MD5s of multiple files in one shot:

```JavaScript
//md5 ./test/testfile.txt ./test/anotherTestFile.txt
md5.files(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(err, md5s) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5s); //[ 'MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214', 'MD5 (anotherTestFile.txt) = 59a8935a0ac35991c27f29d4f25ea8b9' ]
    }
});
```

```JavaScript
//md5 -q ./test/testfile.txt ./test/anotherTestFile.txt
md5.files.quiet(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(err, md5s) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5s); //[ 'f0ffb8dbde05931dfb9baeee5c86b214', '59a8935a0ac35991c27f29d4f25ea8b9' ]
    }
});
```

```JavaScript
//md5 -r ./test/testfile.txt ./test/anotherTestFile.txt
md5.files.reverse(["./test/testfile.txt", "./test/anotherTestFile.txt"], function(err, md5s) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5s); //[ 'f0ffb8dbde05931dfb9baeee5c86b214 file.txt', '59a8935a0ac35991c27f29d4f25ea8b9 file.txt' ]
    }
});
```

####To get the MD5 of a string:

```JavaScript
//md5 -s "Hello, world"
md5.string("Hello, world", function (err, md5) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5); //'MD5 ("Hello, world") = bc6e6f16b8a077ef5fbc8d59d0b931b9'
    }
});
```

```JavaScript
//md5 -qs "Hello, world"
md5.string.quiet("Hello, world", function (err, md5) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5); //"bc6e6f16b8a077ef5fbc8d59d0b931b9"
    }
});
```

```JavaScript
//md5 -rs "Hello, world"
md5.string.reverse("Hello, world", function (err, md5) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(md5); //'bc6e6f16b8a077ef5fbc8d59d0b931b9 "Hello, world"'
    }
});
```
##Contribution welcome!

If you would like to improve on this library, fork it, branch it, pull request it!
[coveralls]: https://img.shields.io/coveralls/heinst/nodejs-md5.svg
[total]: https://img.shields.io/npm/dt/nodejs-md5.svg
[version]: https://img.shields.io/npm/v/nodejs-md5.svg
