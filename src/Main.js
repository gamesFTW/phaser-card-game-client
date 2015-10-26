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

global.main = new Main();

console.log(global.Units.findOne());
