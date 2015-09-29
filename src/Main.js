/**
 *
 * @see:
 * Created by Alex Kalmakov <st00nsa@gmail.com>
 */

var PhaserWrapper = require('phaserWrapper/PhaserWrapper');
var Field = require('field/Field');


/**
 * Main class of game.
 */
class Main {
    constructor() {
        PhaserWrapper.createFinished = this._init;
    }


    _init() {
        this.field = new Field();
    }
}


var main = new Main();
