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

        /**
         * Card selected by player.
         * @type {Card}
         */
        this._selectedCardOnField = null;

        this._initFieldObjectManager();
        this._initTileManager();
    }


    _initFieldObjectManager() {
        this._cardManager.on(
            CardEvent.CARD_CLICK, this._onCardClick.bind(this)
        );

        this._cardManager.on(
            CardEvent.FIELD_CLICK, this._onCardFieldClick.bind(this)
        );

        this._cardManager.on(
            CardEvent.DISPOSE, this._onCardDisposed.bind(this)
        );
    }


    _initTileManager() {
        this._tileManager.parent = this;

        this._tileManager.on(
            FiledObjectsViewEvent.CLICK, this._onTileClick.bind(this)
        );
    }


    _onCardClick(event) {
        this._selectedCard = event.currentTarget;
    }


    _onCardFieldClick(event) {
        this._selectedCardOnField = event.currentTarget;
    }


    _onCardDisposed(event) {
        if (this._selectedCardOnField === event.currentTarget) {
            this._selectedCardOnField = null;
        }
    }


    _onTileClick(event) {
        var clickedTile = event.currentTarget;

        if (this._selectedCard) {
            Backend.playCard(
                this._selectedCard.id, clickedTile.position
            );

            this._selectedCard = null;
        }

        if (this._selectedCardOnField) {
            Backend.moveCardTo(
                this._selectedCardOnField.id, clickedTile.position
            );
        }
    }
}
