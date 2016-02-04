import Backend from 'Backend';

import TileManager from 'tile/TileManager';
import CardManager from 'card/CardManager';
import CardManagerEvent from 'card/CardManagerEvent';

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
        this._selectedCardOnHand = null;

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
            CardManagerEvent.CARD_IN_GAME_CLICK, this._onCardClick.bind(this)
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
        var card = event.card;

        if (this._cardManager.checkCardInHand(card)) {
            this._selectedCardOnHand = card;
            this._selectedCardOnField = null;
        }
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

        if (this._selectedCardOnHand) {
            Backend.playCard(
                this._selectedCardOnHand.id, clickedTile.position
            );

            this._selectedCardOnHand = null;
        }

        if (this._selectedCardOnField) {
            Backend.moveCardTo(
                this._selectedCardOnField.id, clickedTile.position
            );
        }
    }
}
