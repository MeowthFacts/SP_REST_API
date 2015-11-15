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
  },
  nextMapPosition: function(x, y, nextDir) {
    //directions: 0 = Down, 1 = Left, 2 = Up, 3 = Right, 4 = Queue
    if (nextDir === 0) {
      --y;
      if (x === Math.abs(y)){
        ++nextDir;
      }
    }else if (nextDir === 1) {
      --x;
      if (x === y) {
        ++nextDir;
      }
    }else if (nextDir === 2) {
      ++y;
      if (Math.abs(x) === y) {
        ++nextDir;
      }
    }else if (nextDir === 3) {
      ++x;
      if (x - 1 === y) {
        nextDir = 0;
      }
    }else {
      //fk I broke it
    }
    return {"x": x, "y":y, "direction":nextDir};
  }

};
