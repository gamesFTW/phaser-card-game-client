import Backend from 'Backend';

import TileManager from 'tile/TileManager';
import CardManager from 'card/CardManager';

import CardEvent from 'card/CardEvent';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';

import Card from 'card/Card';


export default class TileCardManager {
    constructor(tileManager, cardManager) {
        /**
         * type {TileManager}
         * @private
         */
        this._tileManager = tileManager;


        /**
         * type {CardManager}
         * @private
         */
        this._cardManager = cardManager;

        /**
         * Card selected by player.
         * @type {Card}
         */
        this._selectedCard = null;

        this._initFieldObjectManager();
        this._initTileManager();
    }


    _initFieldObjectManager() {
        this._cardManager.on(
            CardEvent.CLICK, this._onCreatureClick.bind(this)
        );

        this._cardManager.on(
            CardEvent.DISPOSE, this._onCreatureDisposed.bind(this)
        );
    }


    _initTileManager() {
        this._tileManager.parent = this;

        this._tileManager.on(
            FiledObjectsViewEvent.CLICK, this._onTileClick.bind(this)
        );
    }


    _onCreatureClick(event) {
        this._selectedCard = event.currentTarget;
    }


    _onCreatureDisposed(event) {
        if (this._selectedCard === event.currentTarget) {
            this._selectedCard = null;
        }
    }


    _onTileClick(event) {
        var clickedTile = event.currentTarget;

        if (this._selectedCard) {
            Backend.moveCardTo(
                this._selectedCard.id, clickedTile.position
            );
        }
    }
}
