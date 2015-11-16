import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import Field from 'field/Field';
import CardManager from 'card/cardManager';


/**
 * Main class of game.
 */
class Main {
    constructor() {
        PhaserWrapper.createFinished = this._init;
    }


    _init() {
        this.field = new Field();
        this.cardManager = new CardManager();
    }
}

new Main();
