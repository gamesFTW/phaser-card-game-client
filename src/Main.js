/**
 *
 * @see:
 * Created by Alex Kalmakov <st00nsa@gmail.com>
 */

var PhaserWrapper = require('phaserWrapper/PhaserWrapper');
var GameField = require('field/GameField');


/**
 * Main class of game.
 */
class Main {
    constructor() {
        PhaserWrapper.createFinished = this.init_;
    }


    init_() {
        this.gameField = new GameField();
    }
}


var main = new Main();
