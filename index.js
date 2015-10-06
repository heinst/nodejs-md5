var crypto = require('crypto');
var exceptions = require('exceptions');

exports.string = function (str, algorithm, encoding) {
    if (!(typeof str === 'string' || str instanceof String))
    {
	console.log("not a string");
        if (typeof str === 'undefined' && !str)
	{
	    var undefinedException = new exceptions.Exception("Undefined Exception");
            undefinedException.thro("String is undefinded or null");	
	}
        str = String(str);
	console.log(str);
    }

    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

exports.file = function(path, algorithim, callback) {
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
