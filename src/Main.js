import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import TileManager from 'tile/TileManager';
import CardManager from 'card/CardManager';
import TileCardManager from 'TileCardManager';
import Backend from 'Backend';
import InterfaceManager from 'InterfaceManager';


/**
 * Main class of game.
 */
class Main {
    constructor() {
        /**
         * type {TileManager}
         * @private
         */
        this._tileManager = null;


        /**
         * type {CardManager}
         * @private
         */
        this._cardManager = null;


        /**
         * type {InterfaceManager}
         * @private
         */
        this._interfaceManager = null;


        /**
         * type {TileCardManager}
         * @private
         */
        this._tileCardManager = null;


        PhaserWrapper.createFinished = this._init.bind(this);
    }


    _init() {
        this._disableRightClick();
        this._tileManager = new TileManager(
            Backend.getMapWidth(),
            Backend.getMapHeight()
        );
        this._cardManager = new CardManager();

        this._interfaceManager = new InterfaceManager();
        this._interfaceManager.on(
            InterfaceManager.END_OF_TURN_CLICKED,
            this._onEndOfTurnClicked.bind(this)
        );


        this._tileCardManager = new TileCardManager(
            this._tileManager, this._cardManager
        );

        this._loadSavedGame();
    }


    _onEndOfTurnClicked(e) {
        this._cardManager.endOfTurn();
    }


    _disableRightClick() {
        document.oncontextmenu = function(e) {
            return false;
        };
    }


    _loadSavedGame() {
        var cardsData = Backend.getCards();

        this._cardManager.createCardsFromData(cardsData);
    }
}

new Main();
