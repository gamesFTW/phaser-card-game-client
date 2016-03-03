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
        this._selectedCard = null;


        /**
         * Highlighted card.
         * @type {Card}
         */
        this._highlightedCard = null;

        this._initFieldObjectManager();
        this._initTileManager();
    }


    _initFieldObjectManager() {
        this._cardManager.on(
            CardManagerEvent.CARD_IN_GAME_CLICK, this._onCardClick.bind(this)
        );

        this._cardManager.on(
            CardEvent.DISPOSE, this._onCardDisposed.bind(this)
        );

        this._cardManager.on(
            CardEvent.PLAY_AS_MANA, this._onCardPlayedAsMana.bind(this)
        );

        this._cardManager.on(
            CardEvent.OVER, this._onCardOver.bind(this)
        );

        this._cardManager.on(
            CardEvent.OUT, this._onCardOut.bind(this)
        );
    }


    _initTileManager() {
        this._tileManager.parent = this;

        this._tileManager.on(
            FiledObjectsViewEvent.CLICK, this._onTileClick.bind(this)
        );

        this._tileManager.on(
            FiledObjectsViewEvent.OVER, this._onTileOver.bind(this)
        );

        this._tileManager.on(
            FiledObjectsViewEvent.OUT, this._onTileOut.bind(this)
        );
    }


    _chooseHighlightedCard(card) {
        if (this._highlightedCard) {
            this._highlightedCard.highlightOff();
        }
        this._highlightedCard = card;
    }


    _onCardClick(event) {
        var clickedCard = event.card;

        var isSelectedCardInHand = this._cardManager.checkCardIn('hand', this._selectedCard);
        var isClickedCardInHand = this._cardManager.checkCardIn('hand', clickedCard);
        var isClickedCardInTable = this._cardManager.checkCardIn('table', clickedCard);

        if (isSelectedCardInHand) {
            Backend.playCardAsSpell(
                this._selectedCard.id, clickedCard.id
            );
            this._selectedCard = null;
        } else if (isClickedCardInHand || isClickedCardInTable) {
            this._selectedCard = clickedCard;
        }
    }


    _onCardDisposed(event) {
        if (this._selectedCard === event.currentTarget) {
            this._selectedCard = null;
        }
    }


    _onCardPlayedAsMana(event) {
        this._selectedCard = null;
    }


    _onCardOver(event) {
        this._chooseHighlightedCard(event.currentTarget);
    }


    _onCardOut(event) {
        this._highlightedCard = null;
    }


    _onTileClick(event) {
        var clickedTile = event.currentTarget;
        var cardOnTile = this._cardManager.getCreatureByPoint(clickedTile.position);
        var isSelectedCardInHand = this._cardManager.checkCardIn('hand', this._selectedCard);
        var isSelectedCardInTable = this._cardManager.checkCardIn('table', this._selectedCard);

        if (cardOnTile && cardOnTile.type == 'creature') {
            this._selectedCard = cardOnTile;
        } else {
            if (isSelectedCardInHand) {

                Backend.playCard(
                    this._selectedCard.id, clickedTile.position
                );
                this._selectedCard = null;
            }

            if (isSelectedCardInTable && this._selectedCard.onField) {
                Backend.moveCardTo(
                    this._selectedCard.id, clickedTile.position
                );
            }

            if (isSelectedCardInTable && !this._selectedCard.onField) {
                Backend.playCard(
                    this._selectedCard.id, clickedTile.position
                );
            }
        }
    }


    _onTileOver(event) {
        var tile = event.currentTarget;
        var card = this._cardManager.getCreatureByPoint(tile.position);

        if (card) {
            this._chooseHighlightedCard(card);
            card.highlightOn();
        }
    }


    _onTileOut(event) {
        var tile = event.currentTarget;
        var card = this._cardManager.getCreatureByPoint(tile.position);

        if (card) {
            card.highlightOff();
        }
    }
}
