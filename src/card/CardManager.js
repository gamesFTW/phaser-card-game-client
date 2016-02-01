import EventEmitter from 'external/EventEmitter';
import Card from 'card/Card';
import CardEvent from 'card/CardEvent';
import CardInFieldManager from 'card/CardInFieldManager';
import PlayerCards from 'card-groups/PlayerCards';
import PlayerCardsFactory from 'card-groups/PlayerCardsFactory';
import Backend from 'Backend';


export default class CardManager extends EventEmitter {
    constructor() {
        super();


        /**
         * @type {CardInFieldManager}
         * @private
         */
        this._cardInFieldManager = new CardInFieldManager();


        /**
         * @type {Object}
         */
        this._players = PlayerCardsFactory.createPlayerCards(['1', '2'], Backend.getPlayerId());


        this._cards = {};


        //TODO: remove it to MoveAction class
        Backend.on(Backend.CARD_MOVED, this._onCardMoved.bind(this));
        Backend.on(Backend.CARD_REMOVED, this._onCardRemoved.bind(this));
        Backend.on(Backend.CARD_TAPPED, this._onCardTapped.bind(this));
        Backend.on(Backend.CARD_UNTAPPED, this._onCardUntapped.bind(this));
        Backend.on(Backend.CARD_PLAYED, this._onCardPlayed.bind(this));
        Backend.on(Backend.CARD_DIED, this._onCardDied.bind(this));
        Backend.on(Backend.CARD_HEALTH_CHANGED, this._onCardHealthChanged.bind(this));
        Backend.on(Backend.CARD_COUNTER_CHANGED, this._onCardCounterChanged.bind(this));
        Backend.on(Backend.CARD_PLAYED_AS_MANA, this._onCardPlayedAsMana.bind(this));
        Backend.on(Backend.CARD_DRAWN, this._onCardDrawn.bind(this));
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

        // Возможно стоит вынести все слушатели в отдельный класс
        card.on(CardEvent.PRESS_TAP, this._onPressTap.bind(this));
        card.on(CardEvent.PRESS_UNTAP, this._onPressUntap.bind(this));
        card.on(CardEvent.PLAY_AS_MANA, this._onPlayAsMana.bind(this));
        card.on(CardEvent.CARD_CLICK, this._onCardClick.bind(this));

        this._addCard(card);

        this._giveCardToPlayer(card, cardData);

        return card;
    }

    /**
     * @param {Card} card
     * @return {Boolean}
     */
    checkCardInHand(card) {
        var playerCards = this._players[Backend.getPlayerId()];
        return playerCards.checkCardInHand(card);
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


    _drawCard(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromDeckToHand(card);
    }


    _playCard(id, ownerId, position) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromHandToTable(card);
        card.play(position);
    }


    _playCardAsMana(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromHandToManaPool(card);
    }


    _dieCard(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromTableToGraveyard(card);
        card.die();
    }


    _changeCardHealth(id, health) {
        let card = this.findById(id);
        card.health = health;
    }


    _changeCardCounter(id, counter) {
        let card = this.findById(id);
        card.counter = counter;
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


    _onPlayAsMana(event) {
        Backend.playAsMana(event.currentTarget.id);
    }

    _onCardClick(event) {
        var card = event.currentTarget;
        var playerCards = this._players[Backend.getPlayerId()];
        if (playerCards.checkCardInDeck(card)) {
            Backend.drawCard(card.id);
        }
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


    //TODO: remove it to MoveAction class
    _onCardPlayed(event) {
        this._playCard(event.id, event.ownerId, event.position);
    }


    //TODO: remove it to MoveAction class
    _onCardDrawn(event) {
        this._drawCard(event.id, event.ownerId);
    }


    //TODO: remove it to MoveAction class
    _onCardPlayedAsMana(event) {
        this._playCardAsMana(event.id, event.ownerId);
    }


    //TODO: remove it to MoveAction class
    _onCardDied(event) {
        this._dieCard(event.id, event.ownerId);
    }


    //TODO: remove it to MoveAction class
    _onCardHealthChanged(event) {
        this._changeCardHealth(event.id, event.health);
    }


    //TODO: remove it to MoveAction class
    _onCardCounterChanged(event) {
        this._changeCardCounter(event.id, event.counter);
    }
}
