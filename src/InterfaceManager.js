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
        this._createTurnsNumberLabel();
        this._createTimeLeftTimer();

        //TODO: remove it to MoveAction class
        Backend.on(Backend.GAME_TURN_ENDED, this._onTurnEnd.bind(this));
        Backend.on(Backend.GAME_TIMER_TICKED, this._onTimerTick.bind(this));
    }

    _onTimerTick(timerData) {
        this._timeLeftTimerLablel.text = timerData.timeLeft;
    }
    
    _onTurnEnd() {
        this._turnsNumberLabel.text = Backend.getGameTurnNumber();
    }

    _createEndTurnButton() {
        this._eotButton = PhaserWrapper.game.add.button(750, 840, 'button_eot', this._onEndTurnButtonClick, this);
    }
    
    
    _createTurnsNumberLabel() {
        this._turnsNumberLabel = PhaserWrapper.game.add.text(
            820, 890,
            Backend.getGameTurnNumber(),
            {
                font: "28px Arial",
                boundsAlignH: "center",
                align: "center",
                fill: 'white'
            }
        );
    }

    _createTimeLeftTimer() {
        this._timeLeftTimerLablel = PhaserWrapper.game.add.text(
            820, 800,
            'Таймер',
            {
                font: "32px Arial",
                boundsAlignH: "center",
                align: "center",
                fill: 'gray'
            }
        );
    }


    _onEndTurnButtonClick() {
        this.emit(InterfaceManager.END_OF_TURN_CLICKED);
    }
}


