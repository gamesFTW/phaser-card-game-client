import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import Field from 'field/Field';
import CardField from 'card-field/cardField';


/**
 * Main class of game.
 */
class Main {
    constructor() {
        PhaserWrapper.createFinished = this._init;
    }


    _init() {
        this.field = new Field();
        this.cardField = new CardField();
    }
}

new Main();
