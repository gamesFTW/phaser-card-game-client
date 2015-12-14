import EventEmitter from 'external/EventEmitter';
import Card from 'card/Card';
import CardEvent from 'card/CardEvent';
import CardInFieldManager from 'card/CardInFieldManager';
import PlayerCards from 'card-groups/PlayerCards';
import Backend from 'Backend';


export default class CardManager extends EventEmitter {
    constructor() {
        super();


        /**
         * @type {CardInFieldManager}
         * @private
         */
        this._cardInFieldManager = new CardInFieldManager();


        this._players = {
            '1': new PlayerCards('1', 'you'),
            '2': new PlayerCards('2', 'enemy')
        };


        this._cards = {};


        //TODO: remove it to MoveAction class
        Backend.on(Backend.CARD_MOVED, this._onCardMoved.bind(this));
        Backend.on(Backend.CARD_REMOVED, this._onCardRemoved.bind(this));
        Backend.on(Backend.CARD_TAPPED, this._onCardTapped.bind(this));
        Backend.on(Backend.CARD_UNTAPPED, this._onCardUntapped.bind(this));
    }


    findById(id) {
        return this._cards[id];
    }


    /**
     *
     * @param cardData
     * @returns {Card}
     */
    createCard(cardData) {
        if (cardData.cardGroup == 'table') {
            cardData.isOnField = true;
        }

        let card = new Card(cardData);
        card.parent = this;

        // Возможно стоит вынести все слушатели в отдельный класс.
        card.on(CardEvent.PRESS_TAP, this._onPressTap.bind(this));
        card.on(CardEvent.PRESS_UNTAP, this._onPressUntap.bind(this));

        this._addCard(card);

        this._giveCardToPlayer(card, cardData);

        return card;
    }


    _removeCard(id) {
        let card = this.findById(id);
        card.dispose();
        delete this._cards[id];
    }


    _tapCard(id) {
        let card = this.findById(id);
        card.tap();
    }


    _untapCard(id) {
        let card = this.findById(id);
        card.untap();
    }


    _addCard(card) {
        this._cards[card.id] = card;
    }


    _giveCardToPlayer(card, cardData) {
        this._players[cardData.ownerId].addCard(card, cardData.cardGroup);
    }


    _onPressTap(event) {
        Backend.tapCard(event.currentTarget.id);
    }


    _onPressUntap(event) {
        Backend.untapCard(event.currentTarget.id);
    }


    //TODO: remove it to MoveAction class
    _onCardMoved(event) {
        var card = this.findById(event.id);
        card.position = event.position;
    }


    //TODO: remove it to MoveAction class
    _onCardRemoved(event) {
        this._removeCard(event.id);
    }


    //TODO: remove it to MoveAction class
    _onCardTapped(event) {
        this._tapCard(event.id);
    }


    //TODO: remove it to MoveAction class
    _onCardUntapped(event) {
        this._untapCard(event.id);
    }
}
