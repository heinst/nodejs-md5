var crypto = require('crypto');
var exceptions = require('exceptions');
var Q = require("q");

exports.string = function (str, algorithm, encoding) {
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
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

exports.file = function(paths, algorithim, callback) {
    loopThroughPaths(paths, algorithim, function(md5List){
        callback(md5List);
    });
}

exports.file.quiet = function(paths, algorithim, callback) {
    loopThroughPathsQuiet(paths, algorithim, function(md5List){
        callback(md5List);
    });
}

function loopThroughPaths(paths, algorithim, callback)
{
    var md5s = [];
    var fileNames = [];
    var processedCounter = 0;
    for(var i = 0; i < paths.length; i++)
    {
        var path = paths[i];
        var pathSplit = path.split("/");
        fileNames.push(pathSplit[pathSplit.length - 1]);
        fileMd5(path, algorithim, function(md5) {
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

function loopThroughPathsQuiet(paths, algorithim, callback)
{
    var md5s = [];
    var processedCounter = 0;
    for(var i = 0; i < paths.length; i++)
    {
        var path = paths[i];
        fileMd5(path, algorithim, function(md5) {

            md5s.push(md5);
            if (processedCounter + 1 == i)
            {
                callback(md5s);
            }
            ++processedCounter;
        });

    }
}

function fileMd5(path, algorithim, callback)
{
    var fs = require('fs');

    if(!(fs.lstatSync(path).isDirectory()))
    {
        var hash = crypto.createHash(algorithim);
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
