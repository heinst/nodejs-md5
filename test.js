var md5 = require('./index');

md5.file('/Users/Trevor/Developer/repos/md5/package.json', 'md5', function(md) {
    console.log(md);
});

console.log(md5.string("Hello, world!"));
