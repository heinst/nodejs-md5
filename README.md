# nodejs-md5  [![Build Status](https://travis-ci.org/heinst/node-md5.svg)](https://travis-ci.org/heinst/node-md5)

A simple node module to give you the md5 of a file or string. 
Mimics the unix command `md5`.

##To install:

`npm install nodejs-md5`

##To import:

`var md5 = require("nodejs-md5");`

##Example Usage:

####To get the md5 of a file:

```md5.file('/path/to/some/file.txt', 'md5', function(md) {
    console.log(md);
});```

####To get the md5 of a string:

`console.log(md5.string("Hello, world"));`
