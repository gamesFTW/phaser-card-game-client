/**
 *
 * @see:
 * Created by Alex Kalmakov <st00nsa@gmail.com>
 */

import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Field from 'field/Field';


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
