import EventEmitter from 'external/EventEmitter';
import Phaser from 'phaser';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import Card from 'card/Card';
import CardEvent from 'card/CardEvent';
import CardInFieldManager from 'card/CardInFieldManager';
import CardManagerEvent from 'card/CardManagerEvent';


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
        this._players = PlayerCardsFactory.createPlayerCards(
            Backend.getPlayersIds(), Backend.getPlayerId()
        );


        this._cards = {};


        //TODO: remove it to MoveAction class
        Backend.on(Backend.CARD_MOVED, this._onCardMoved.bind(this));
        Backend.on(Backend.CARD_REMOVED, this._onCardRemoved.bind(this));
        Backend.on(Backend.CARD_TAPPED, this._onCardTapped.bind(this));
        Backend.on(Backend.CARD_UNTAPPED, this._onCardUntapped.bind(this));
        Backend.on(Backend.CARD_PLAYED, this._onCardPlayed.bind(this));
        Backend.on(Backend.CARD_PLAYED_AS_SPELL, this._onCardPlayedAsSpell.bind(this));
        Backend.on(Backend.CARD_PLAYED_AS_MANA, this._onCardPlayedAsMana.bind(this));
        Backend.on(Backend.CARD_DIED, this._onCardDied.bind(this));
        Backend.on(Backend.CARD_HEALTH_CHANGED, this._onCardHealthChanged.bind(this));
        Backend.on(Backend.CARD_COUNTER_CHANGED, this._onCardCounterChanged.bind(this));
        Backend.on(Backend.CARD_DRAWN, this._onCardDrawn.bind(this));
        Backend.on(Backend.CARD_ROTATED, this._onCardRotated.bind(this));
        Backend.on(
            Backend.CARD_MOVED_TO_PREVIOUS_GROUP,
            this._onCardMovedToPreviousGroup.bind(this)
        );
    }


    findById(id) {
        return this._cards[id];
    }


    /**
     * Загрузка игры
     * @param cardsData
     */
    createCardsFromData(cardsData) {
        cardsData.forEach(c => this.createCard(c));

        var allCards = this._cards;

        _.values(this._cards).forEach(function(card) {
            card.attachedCardsIds.forEach(function(attachedCardId) {
                card.attachCard(allCards[attachedCardId]);
            });
        });

        _.values(this._players).forEach(pc => pc._table.redraw());
    }

    /**
     *
     * @param cardData
     * @returns {Card}
     */
    createCard(cardData) {
        // TODO говно же бекграунд, плохо считать сыграность карты по наличию X и Y, нужно иметь поле attached.
        if (cardData.cardGroup === 'table' && cardData.x !== undefined) {
            cardData.onField = true;
        }

        let card = new Card(cardData);
        card.parent = this;

        // Возможно стоит вынести все слушатели в отдельный класс
        card.on(CardEvent.PRESS_TAP, this._onCardPressTap.bind(this));
        card.on(CardEvent.PRESS_UNTAP, this._onCardPressUntap.bind(this));
        card.on(CardEvent.PLAY_AS_MANA, this._onCardPlayAsMana.bind(this));
        card.on(CardEvent.ROTATE, this._onCardRotate.bind(this));
        card.on(CardEvent.CARD_CLICK, this._onCardClick.bind(this));

        this._addCard(card);

        this._giveCardToPlayer(card, cardData);

        return card;
    }


    /**
     * @param {Card} card
     * @return {Boolean}
     */
    checkCardIn(type, card) {
        if (!card) {
            return false;
        }
        var playerCards = this._players[Backend.getPlayerId()];
        if (type == 'hand') {
            return playerCards.checkCardInHand(card);
        }

        if (type == 'table') {
            return playerCards.checkCardInTable(card);
        }

    }


    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     * @return {Card}
     */
    getCreatureByPoint(point) {
        var resultedCard = null;
        var cards = _.values(this._cards);

        _.forEach(cards, function(card) {
            var cardPosition = card.position;
            var isOnPoint = cardPosition.x == point.x && cardPosition.y == point.y;
            if (isOnPoint && card.onField) {
                resultedCard = card;
                return false;
            }
        });

        return resultedCard;
    }


    endOfTurn() {
        var ownerId = Backend.getPlayerId();
        var playerCards = this._players[ownerId];
        // Draw 2 cards
        var cardsToDraw = playerCards.getNCardsFromTopDeck(2);
        cardsToDraw.forEach(c => Backend.drawCard(c.id));

        //Untap creatures
        var cardsToUntap = playerCards.getAllCardsFromTable();
        cardsToUntap.forEach(c => Backend.untapCard(c.id));

        //Untap mana
        var manaToUntap = playerCards.getTappedCardsFromManaPool();
        _.slice(manaToUntap,0, 2).forEach(c => Backend.untapCard(c.id));
    }


    _addCard(card) {
        this._cards[card.id] = card;
    }


    _dieCard(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromTableToGraveyard(card);
        card.die();
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


    _rotateCard(id, rotated) {
        let card = this.findById(id);
        card.rotated = rotated;
    }


    _playCard(id, ownerId, position, playType) {
        let card = this.findById(id);

        if (playType == 'summon') {
            this._players[ownerId].moveCardFromHandToTable(card);
        }
        card.play(position);

        this._deattachCard(card, ownerId);
    }


    _playCardAsSpell(playedCardId, targetCardId, ownerId) {
        let playedCard = this.findById(playedCardId);
        let targetCard = this.findById(targetCardId);

        targetCard.attachCard(playedCard);
        this._players[ownerId].moveCardFromHandToTable(playedCard);
    }


    _playCardAsMana(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromHandToManaPool(card);
    }


    _changeCardHealth(id, health) {
        let card = this.findById(id);
        card.health = health;
    }


    _changeCardCounter(id, counter) {
        let card = this.findById(id);
        card.counter = counter;
    }


    _giveCardToPlayer(card, cardData) {
        this._players[cardData.ownerId].addCard(card, cardData.cardGroup);
    }


    /**
     *
     * @param {String} id
     * @param {String} ownerId
     * @param {String} oldCardGroup
     * @param {String} newCardGroup
     * @private
     */
    _moveCardToPreviousGroup(id, ownerId, oldCardGroup, newCardGroup) {
        let card = this.findById(id);
        var player = this._players[ownerId];

        if (oldCardGroup === 'hand') {
            player.moveCardFromHandToDeck(card)
        } else if (oldCardGroup === 'table') {
            player.moveCardFromTableToHand(card);
            card.die();

            this._deattachCard(card, ownerId);
        } else if (oldCardGroup === 'graveyard') {
            if (newCardGroup === 'table') {
                player.moveCardFromGraveyardToTable(card);
                card.play(card.position);
            } else if (newCardGroup === 'hand') {
                player.moveCardFromGraveyardToHand(card);
            }
        } else if (oldCardGroup === 'manaPool') {
            player.moveCardFromManaPoolToHand(card);
        }
    }


    _deattachCard(card, ownerId) {
        if (card.attachable) {
            var player = this._players[ownerId];

            _.values(this._cards).forEach(function(maybeParentCard) {
                if (_.contains(maybeParentCard.attachedCardsIds, card.id)) {
                    maybeParentCard.deattachCard(card);
                }
            });

            // не ну это пиздец
            player._table.redraw();
        }
    }

    /**
     * HANDLERS
     */
    _onCardPressTap(event) {
        Backend.tapCard(event.currentTarget.id);
    }


    _onCardPressUntap(event) {
        Backend.untapCard(event.currentTarget.id);
    }


    _onCardPlayAsMana(event) {
        Backend.playAsMana(event.currentTarget.id);
    }


    _onCardRotate(event) {
        Backend.rotateCard(event.currentTarget.id);
    }


    _onCardClick(event) {
        var card = event.currentTarget;
        var playerCards = this._players[Backend.getPlayerId()];

        // Если игрок хочет отменить draw/die/play
        var isCardPlayUndo = PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.Z);
        if (isCardPlayUndo) {
            Backend.moveCardToPreviousGroup(card.id);
            return;
        }

        if (playerCards.checkCardInDeck(card)) {
            Backend.drawCard(card.id);
        } else {
            this.emit(CardManagerEvent.CARD_IN_GAME_CLICK, {card: card});
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
        this._playCard(event.id, event.ownerId, event.position, event.playType);
    }


    //TODO: remove it to MoveAction class
    _onCardPlayedAsSpell(event) {
        this._playCardAsSpell(event.playedCardId, event.targetCardId, event.ownerId);
    }


    //TODO: remove it to MoveAction class
    _onCardDrawn(event) {
        this._drawCard(event.id, event.ownerId);
    }


    //TODO: remove it to MoveAction class
    _onCardRotated(event) {
        this._rotateCard(event.id, event.rotated);
    }


    //TODO: remove it to MoveAction class
    _onCardPlayedAsMana(event) {
        this._playCardAsMana(event.id, event.ownerId);
    }


    //TODO: remove it to MoveAction class
    _onCardDied(event) {
        let id = event.id,
            card = this.findById(id),
            ownerId = event.ownerId;

        this._deattachCard(card, ownerId);
        this._dieCard(id, ownerId);
    }


    //TODO: remove it to MoveAction class
    _onCardHealthChanged(event) {
        this._changeCardHealth(event.id, event.health);
    }


    //TODO: remove it to MoveAction class
    _onCardCounterChanged(event) {
        this._changeCardCounter(event.id, event.counter);
    }


    //TODO: remove it to MoveAction class
    _onCardMovedToPreviousGroup(event) {
        this._moveCardToPreviousGroup(
            event.id, event.ownerId, event.oldCardGroup, event.newCardGroup
        );
    }
}

