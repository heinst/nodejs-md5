# nodejs-md5  ![Version][version] [![Build Status](https://travis-ci.org/heinst/nodejs-md5.svg)](https://travis-ci.org/heinst/nodejs-md5) ![Coverage Status][coveralls] ![Total Downloads][total]

A simple node module to give you the md5 of a file or string. 
Mimics the unix command `md5`.

##To install:

```bash
npm install nodejs-md5
```

##To import:

```JavaScript
var md5 = require("nodejs-md5");
```

##Example Usage:

####To get the md5 of a file:

```JavaScript
//md5 /path/to/some/file.txt
md5.file('/path/to/some/file.txt', function(md) {
    console.log(md); //'MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214'
});
```

```JavaScript
//md5 -q /path/to/some/file.txt
md5.file.quiet('/path/to/some/file.txt', function(md) {
    console.log(md); //'f0ffb8dbde05931dfb9baeee5c86b214'
});
```

```JavaScript
//md5 -r /path/to/some/file.txt
md5.file.reverse('/path/to/some/file.txt', function(md) {
    console.log(md); //'f0ffb8dbde05931dfb9baeee5c86b214 file.txt'
});
```

####To get the md5 of files in one shot:

```JavaScript
//md5 /path/to/some/file.txt /path/to/some/other/file.txt
md5.files(['/path/to/some/file.txt', '/path/to/some/other/file.txt'], function(md) {
    console.log(md); //[ 'MD5 (testfile.txt) = f0ffb8dbde05931dfb9baeee5c86b214', 'MD5 (anotherTestFile.txt) = 59a8935a0ac35991c27f29d4f25ea8b9' ]
});
```

```JavaScript
//md5 -q /path/to/some/file.txt /path/to/some/other/file.txt
md5.files.quiet(['/path/to/some/file.txt', '/path/to/some/other/file.txt'], function(md) {
    console.log(md); //[ 'f0ffb8dbde05931dfb9baeee5c86b214', '59a8935a0ac35991c27f29d4f25ea8b9' ]
});
```

```JavaScript
//md5 -r /path/to/some/file.txt /path/to/some/other/file.txt
md5.files.reverse(['/path/to/some/file.txt', '/path/to/some/other/file.txt'], function(md) {
    console.log(md); //[ 'f0ffb8dbde05931dfb9baeee5c86b214 file.txt', '59a8935a0ac35991c27f29d4f25ea8b9 file.txt' ]
});
```

####To get the md5 of a string:

```JavaScript
//md5 -s "Hello, world"
console.log(md5.string("Hello, world"));
```

```JavaScript
//md5 -qs "Hello, world"
console.log(md5.string.quiet("Hello, world")); //"bc6e6f16b8a077ef5fbc8d59d0b931b9"
```

```JavaScript
//md5 -rs "Hello, world"
console.log(md5.string.reverse("Hello, world")); //"bc6e6f16b8a077ef5fbc8d59d0b931b9 \"Hello, world\"
```
##Contribution welcome!

If you would like to imporve on this library, fork it, branch it, pull request it!
[coveralls]: https://img.shields.io/coveralls/heinst/nodejs-md5.svg
[total]: https://img.shields.io/npm/dt/nodejs-md5.svg
[version]: https://img.shields.io/npm/v/nodejs-md5.svg
