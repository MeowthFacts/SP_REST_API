//Error File
module.exports = function(ErrorCode)
{
	var fs = require('fs');
	var data = fs.readFileSync('./routes/errors/ErrorList.json', 'utf8');
	var obj = JSON.parse(data);

	if(typeof ErrorCode == 'object') {
		console.error(ErrorCode);
		var code = ErrorCode.code;
		console.log("true");
		var json = {error_code:code, info:obj[code] + ": " + ErrorCode.detail, success:false};
	}else {
		var json = {error_code:ErrorCode,info:obj[ErrorCode],success:false};
	}
	console.log(json);
	return json;
}
