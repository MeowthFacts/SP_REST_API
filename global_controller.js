module.exports = {
  pad: function(str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  },
  getError: function(error) {
    console.log(error);
    error = JSON.parse(JSON.stringify(error));
    if(error.code !== undefined){
    }else if(typeof error === "number") {
    }else {
      console.log(error);
      error = "110";
    }
    return error;
  }
};
