module.exports = {
  pad: function(str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  },
  getError: function(error) {
    error = JSON.parse(JSON.stringify(error));
    if(error.code !== undefined){
    }else if(typeof error === "number") {
    }else {
      console.log(error);
      error = "110";
    }
    return error;
  },
  resources: function() {
    var fs = require('fs');
    var data = fs.readFileSync('./config/tiles.json', 'utf8');
    var obj = JSON.parse(data);
    return obj.resources;
  },
  merchants: function() {
    var fs = require('fs');
    var data = fs.readFileSync('./config/tiles.json', 'utf8');
    var obj = JSON.parse(data);
    return obj.merchants;
  },
  tiles: function() {
    var fs = require('fs');
    var data = fs.readFileSync('./config/tiles.json', 'utf8');
    var obj = JSON.parse(data);
    return obj.tiles;
  }
};
