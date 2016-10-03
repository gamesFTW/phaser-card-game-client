import EventEmitter from 'external/EventEmitter';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Backend from 'Backend';


export default class InterfaceManager extends EventEmitter {
    static get END_OF_TURN_CLICKED() { return 'InterfaceManager:endOfTurnClicked'; }

    constructor() {
        super();

        /**
         * @type {Phaser.Button}
         * @private
         */
        this._eotButton = null;

        this._createEndTurnButton();
    }


    _createEndTurnButton() {
        this._eotButton =  PhaserWrapper.game.add.button(750, 840, 'button_eot', this._onEndTurnButtonClick, this);
    }


    _onEndTurnButtonClick() {
        this.emit(InterfaceManager.END_OF_TURN_CLICKED);
    }
}


