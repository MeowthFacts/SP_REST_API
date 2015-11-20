//Error File
module.exports = function(ErrorCode)
{
	var fs = require('fs');
	var data = fs.readFileSync('./routes/errors/ErrorList.json', 'utf8');
	var obj = JSON.parse(data);

	if(typeof ErrorCode == 'object') {
		var code = ErrorCode.code;
		if(obj[code] === undefined) {
			console.log("error code unknown");
			console.log(ErrorCode);
		 }
		var json = {error_code:code, info:obj[code] + ": " + (ErrorCode.detail || "unknown"), success:false};
	}else {
		var json = {error_code:ErrorCode,info:obj[ErrorCode],success:false};
	}
	console.log(json);
	return json;
}
