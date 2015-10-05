var crypto = require('crypto');

exports.string = function (str, algorithm, encoding) {
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
        callback(path + ": Is a directory")
    }
}
