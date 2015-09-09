/**
 *
 * @see:
 * Created by Alex Kalmakov <st00nsa@gmail.com>
 */

var Map = require('../map').Map;
var preload = require('./gameStages/preload').preloadStage;

class GameController {
    constructor() {

    }

    preload(game){
        preload(game);
    }


}

exports.GameController = GameController;