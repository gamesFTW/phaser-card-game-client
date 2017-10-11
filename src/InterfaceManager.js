import EventEmitter from 'external/EventEmitter';

import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Backend from 'BackendAdapter';


export default class InterfaceManager extends EventEmitter {
    static get END_OF_TURN_CLICKED() { return 'InterfaceManager:endOfTurnClicked'; }

    constructor() {
        super();

        /**
         * @type {Phaser.Button}
         * @private
         */
        this._eotButton = null;
        this._timeLeftTimerLablel = null;
        this._turnsNumberLabel = null;
        this._globalTimerCurrentPlayer = null;
        this._globalTimerOtherPlayer = null;

        this._createEndTurnButton();
        this._createTurnsNumberLabel();
        this._createTimeLeftTimer();
        this._createGlobalTimerCurrentPlayer();
        this._createGlobalTimerOtherPlayer();
        
        this._createPauseHandler();

        //TODO: remove it to MoveAction class
        Backend.on(Backend.GAME_TURN_ENDED, this._onTurnEnd.bind(this));
        Backend.on(Backend.GAME_TIMER_TICKED, this._onTimerTick.bind(this));
        
    }

    /**
     * 
     * @param timerData
     * @param timerData.timeLeft Number
     * @param timerData.globalTimers Object
     * @private
     */
    _onTimerTick(timerData) {
        this._timeLeftTimerLablel.text = secToMin(timerData.timeLeft);
        
        _.forEach(timerData.globalTimers, (v, k) => {
            if (k == Backend.getCurrentPlayerId()) {
                this._globalTimerCurrentPlayer.text = secToMin(v);
            } else {
                this._globalTimerOtherPlayer.text = secToMin(v);
            }
        });
    }

    _onSpacePress() {
        console.log('pause by spacebar');
        Backend.tooglePauseGame();
    }
    
    _onTurnEnd() {
        this._turnsNumberLabel.text = Backend.getGameTurnNumber();
    }

    _createEndTurnButton() {
        this._eotButton = PhaserWrapper.game.add.button(750, 840, 'button_eot', this._onEndTurnButtonClick, this);
    }

    _createPauseHandler() {
        var space = PhaserWrapper.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this._onSpacePress, this);
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
     
    
    _createGlobalTimerOtherPlayer() {
        this._globalTimerOtherPlayer = PhaserWrapper.game.add.text(
            1100, 20,
            'Global timer',
            {
                font: "18px Arial",
                boundsAlignH: "center",
                align: "center",
                fill: 'gray'
            }
        );
    }

    
    _createGlobalTimerCurrentPlayer() {
        this._globalTimerCurrentPlayer = PhaserWrapper.game.add.text(
            1100, 860,
            'Global timer',
            {
                font: "18px Arial",
                boundsAlignH: "center",
                align: "center",
                fill: 'gray'
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


function secToMin(sec) {
    if (sec === Infinity) {
        return '--';
    }
    return new Date(sec * 1000).toISOString().substr(14, 5);
}
