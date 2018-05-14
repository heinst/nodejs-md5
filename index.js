var crypto = require('crypto');

//md5 for strings and its options
function getHashOfString (str) {
    return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}

function getMD5(str, callback) {
    if (str === null)
    {
        callback(new Error("Variable passed in is null"), null);
    }
    else if (typeof str !== 'string') {
        callback(new Error("Variable passed in is not a String"), null);
    }
    else {
        callback(null, getHashOfString(str));
    }
}


exports.string = function (str, callback) {
    getMD5(str, function(err, md5) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, "MD5 (\"" + str + "\") = " + md5);
        }
    });
}

exports.string.quiet = function (str, callback) {
    getMD5(str, function(err, md5) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, getHashOfString(str));
        }
    });
}

exports.string.reverse = function (str, callback) {
    getMD5(str, function(err, md5) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, getHashOfString(str) + " " + "\"" + str + "\"");
        }
    });
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
            callback(null, hash.digest('hex'));
        });
    }
    else
    {
        callback(new Error(path + "  - Is a directory"), null);
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
        fileMd5(path, function(err, md5) {

            if (err) {
                callback(err, null);
            }

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
                callback(null, md5s);
            }
            ++processedCounter;
        });

    }
}

exports.files = function(paths, callback) {
    loopThroughPaths(paths, "standard", function(err, md5List) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, md5List);
        }

    });
}

exports.files.quiet = function(paths, callback) {
    loopThroughPaths(paths, "quiet", function(err, md5List){
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, md5List);
        }
    });
}

exports.files.reverse = function(paths, callback) {
    loopThroughPaths(paths, "reverse", function(err, md5List){
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, md5List);
        }
    });
}

//md5 for file and their options
exports.file = function(path, callback) {
    fileMd5(path, function(err, md5) {
        if (err) {
            callback(err, null);
        }
        else {
            var pathSplit = path.split("/");
            var md5Str = "MD5 (" + pathSplit[pathSplit.length - 1] + ")" + " = " + md5;
            callback(null, md5Str);
        }
    });
}

exports.file.quiet = function(path, callback) {
    fileMd5(path, function(err, md5) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, md5);
        }
    });
}

exports.file.reverse = function(path, callback) {
    fileMd5(path, function(err, md5) {
        if (err) {
            callback(err, null);
        }
        else {
            var pathSplit = path.split("/");
            var md5Str = md5 + " " + pathSplit[pathSplit.length - 1];
            callback(null, md5Str);
        }
    });
}
