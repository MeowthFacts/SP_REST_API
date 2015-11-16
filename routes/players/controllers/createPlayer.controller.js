module.exports = {
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
  },
  //GENERATE THE TILES FOR THE PLAYER
  generateRandomTiles: function(player_tiles) {
    console.log("Generatig Random Tiles");
    var Controller = require('../../../global_controller');
    //9 tiles come in, need to assign merchant, home, and resource
    var tiles = Controller.tiles();
    var resources = Controller.resources();
    var merchants = Controller.merchants();
    //creates an array of json object keys
    //makes the ID's indexable via integer
    var tile_categories = Object.keys(tiles);
    var merch_categories = Object.keys(merchants);
    var res_categories = Object.keys(resources);

    //set up useful data structures
    var player_tiles_id = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    //RANDOM TILE INT GENERATOR
    //select tile id for all 9 spots
    for (var i = 0; i < 9; ++i) {
      //select the tile category (desert, forest, ....)
      var cat = Math.floor(Math.random() * (tile_categories.length - 1));
      //select one of the IDs in the category
      var id = Math.floor(Math.random() * tiles[tile_categories[cat]].length);
      player_tiles_id[i] = parseInt(tiles[tile_categories[cat]][id]);
    }


    //Get players home location
    var bucket = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var home = Math.floor(Math.random() * bucket.length);
    bucket.splice(bucket.indexOf(home), 1);

    var mpos = bucket[Math.floor(Math.random() * bucket.length)];
    bucket.splice(bucket.indexOf(mpos), 1);

    var rpos = bucket[Math.floor(Math.random() * bucket.length)];
    bucket.splice(bucket.indexOf(rpos), 1);
    //position, id
    var merch = [mpos, 0];
    var res = [rpos, 0];
    //randomly selecting merch and resource ID
    merch[1] = merchants[merch_categories[Math.floor(Math.random() * merch_categories.length)]];
    res[1] = resources[res_categories[Math.floor(Math.random() * res_categories.length)]];

    for(var i = 0; i < 9; ++i) {
        player_tiles[i].tile_id = player_tiles_id[player_tiles[i].tile_num];
        if(home == player_tiles[i].tile_num) {
          player_tiles[i].is_home = true;
        }
        if(merch[0] == player_tiles[i].tile_num) {
          player_tiles[i].is_merch = true;
          player_tiles[i].merch_id = merch[1];
        }
        if(res[0] == player_tiles[i].tile_num) {
          player_tiles[i].is_res = true;
          player_tiles[i].res_id = res[1];
        }
    }
    return player_tiles;
  }


};
