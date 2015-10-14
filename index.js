var crypto = require('crypto');
var exceptions = require('exceptions');

//md5 for strings and its options

exports.string = function (str) {
    if (!(typeof str === 'string' || str instanceof String))
    {
        if (typeof str === 'undefined' && !str)
	    {
	        var undefinedException = new exceptions.Exception("Undefined Exception");
            undefinedException.thro("String is undefinded or null");
	    }
        str = String(str);
    }

    return  "MD5 (\"" + str + "\") = " + crypto.createHash('md5').update(str, 'utf8').digest('hex');
}

exports.string.quiet = function (str) {
    if (!(typeof str === 'string' || str instanceof String))
    {
        if (typeof str === 'undefined' && !str)
        {
            var undefinedException = new exceptions.Exception("Undefined Exception");
            undefinedException.thro("String is undefinded or null");
        }
        str = String(str);
    }

    return crypto
        .createHash('md5')
        .update(str, 'utf8')
        .digest('hex');
}

exports.string.reverse = function (str) {
    if (!(typeof str === 'string' || str instanceof String))
    {
        if (typeof str === 'undefined' && !str)
        {
            var undefinedException = new exceptions.Exception("Undefined Exception");
            undefinedException.thro("String is undefinded or null");
        }
        str = String(str);
    }

    return  crypto.createHash('md5').update(str, 'utf8').digest('hex') + " " + "\"" + str + "\"";
}

//md5 for files and their options
exports.files = function(paths, callback) {
    loopThroughPaths(paths, function(md5List){
        callback(md5List);
    });
}

exports.files.quiet = function(paths, callback) {
    loopThroughPathsQuiet(paths, function(md5List){
        callback(md5List);
    });
}

exports.files.reverse = function(paths, callback) {
    loopThroughPathsReverse(paths, function(md5List){
        callback(md5List);
    });
}

function loopThroughPaths(paths, callback)
{
    var md5s = [];
    var fileNames = [];
    var processedCounter = 0;
    for(var i = 0; i < paths.length; i++)
    {
        var path = paths[i];
        var pathSplit = path.split("/");
        fileNames.push(pathSplit[pathSplit.length - 1]);
        fileMd5(path, function(md5) {
            var md5Str = "MD5 (" + fileNames[processedCounter] + ")" + " = " + md5;
            md5s.push(md5Str);
            if (processedCounter + 1 == i)
            {
                callback(md5s);
            }
            ++processedCounter;
        });

    }
}

function loopThroughPathsReverse(paths, callback)
{
    var md5s = [];
    var fileNames = [];
    var processedCounter = 0;
    for(var i = 0; i < paths.length; i++)
    {
        var path = paths[i];
        var pathSplit = path.split("/");
        fileNames.push(pathSplit[pathSplit.length - 1]);
        fileMd5(path, function(md5) {
            var md5Str = md5 + " " + fileNames[processedCounter];
            md5s.push(md5Str);
            if (processedCounter + 1 == i)
            {
                callback(md5s);
            }
            ++processedCounter;
        });

    }
}

function loopThroughPathsQuiet(paths, callback)
{
    var md5s = [];
    var processedCounter = 0;
    for(var i = 0; i < paths.length; i++)
    {
        var path = paths[i];
        fileMd5(path, function(md5) {

            md5s.push(md5);
            if (processedCounter + 1 == i)
            {
                callback(md5s);
            }
            ++processedCounter;
        });

    }
}

function fileMd5(path, callback)
{
    var fs = require('fs');

    if(!(fs.lstatSync(path).isDirectory()))
    {
        var hash = crypto.createHash('md5');
    	var stream = fs.createReadStream(path);

        stream.on('data', function(data){
            hash.update(data);
        });

        stream.on('end', function() {
            callback(hash.digest('hex'));
        });
    }
    else
    {
	    var dirException = new exceptions.Exception("Directory Exception");
	    dirException.thro(path + ": Is a directory");
    }
}

exports.file = function(path, callback) {
    var fs = require('fs');

    if(!(fs.lstatSync(path).isDirectory()))
    {
        var hash = crypto.createHash('md5');
        var stream = fs.createReadStream(path);

        stream.on('data', function(data){
            hash.update(data);
        });

        stream.on('end', function() {
            var pathSplit = path.split("/");
            callback("MD5 (" + pathSplit[pathSplit.length - 1] + ") = " + hash.digest('hex'));
        });
    }
    else
    {
    var dirException = new exceptions.Exception("Directory Exception");
    dirException.thro(path + ": Is a directory");
    }
}

exports.file.quiet = function(path, callback) {
    var fs = require('fs');

    if(!(fs.lstatSync(path).isDirectory()))
    {
        var hash = crypto.createHash('md5');
        var stream = fs.createReadStream(path);

        stream.on('data', function(data){
            hash.update(data);
        });

        stream.on('end', function() {
            callback(hash.digest('hex'));
        });
    }
    else
    {
    var dirException = new exceptions.Exception("Directory Exception");
    dirException.thro(path + ": Is a directory");
    }
}

exports.file.reverse = function(path, callback) {
    var fs = require('fs');

    if(!(fs.lstatSync(path).isDirectory()))
    {
        var hash = crypto.createHash('md5');
        var stream = fs.createReadStream(path);

        stream.on('data', function(data){
            hash.update(data);
        });

        stream.on('end', function() {
            var pathSplit = path.split("/");
            callback(hash.digest('hex') + " " + pathSplit[pathSplit.length - 1]);
        });
    }
    else
    {
    var dirException = new exceptions.Exception("Directory Exception");
    dirException.thro(path + ": Is a directory");
    }
}
