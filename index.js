var crypto = require('crypto');
var exceptions = require('exceptions');

//md5 for strings and its options
function getHashOfString (str) {
    return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}

function checkInput(str) {

    if (typeof str === 'undefined' && !str)
    {
        throw new Error("Variable passed in is undefined");
    }
    else if (typeof str !== 'string') {
        throw new Error("Variable passed in is not a String");
    }
}


exports.string = function (str) {
    checkInput(str);
    return  "MD5 (\"" + str + "\") = " + getHashOfString(str);
}

exports.string.quiet = function (str) {
    checkInput(str);
    return getHashOfString(str);
}

exports.string.reverse = function (str) {
    checkInput(str);
    return  getHashOfString(str) + " " + "\"" + str + "\"";
}

//md5 for files and their options
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

function loopThroughPaths(paths, outputType, callback)
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
            var md5Str;
            if(outputType === "reverse") {
                md5Str = md5 + " " + fileNames[processedCounter];
                md5s.push(md5Str);
            }
            else if(outputType === "quiet") {
                md5s.push(md5);
            }
            else {
                md5Str = "MD5 (" + fileNames[processedCounter] + ")" + " = " + md5;
                md5s.push(md5Str);
            }

            if (processedCounter + 1 == i)
            {
                callback(md5s);
            }
            ++processedCounter;
        });

    }
}

exports.files = function(paths, callback) {
    loopThroughPaths(paths, "standard", function(md5List){
        callback(md5List);
    });
}

exports.files.quiet = function(paths, callback) {
    loopThroughPaths(paths, "quiet", function(md5List){
        callback(md5List);
    });
}

exports.files.reverse = function(paths, callback) {
    loopThroughPaths(paths, "reverse", function(md5List){
        callback(md5List);
    });
}

//md5 for file and their options
exports.file = function(path, callback) {
    fileMd5(path, function(md5) {
        var pathSplit = path.split("/");
        var md5Str = "MD5 (" + pathSplit[pathSplit.length - 1] + ")" + " = " + md5;
        callback(md5Str);
    });
}

exports.file.quiet = function(path, callback) {
    fileMd5(path, function(md5) {
        callback(md5);
    });
}

exports.file.reverse = function(path, callback) {
    fileMd5(path, function(md5) {
        var pathSplit = path.split("/");
        var md5Str = md5 + " " + pathSplit[pathSplit.length - 1];
        callback(md5Str);
    });
}
