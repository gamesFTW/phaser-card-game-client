import EventEmitter from 'external/EventEmitter';
import Phaser from 'phaser';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import Card from 'card/Card';
import CardEvent from 'card/CardEvent';
import CardInFieldManager from 'card/CardInFieldManager';
import CardManagerEvent from 'card/CardManagerEvent';


import PlayerCards from 'cardGroups/PlayerCards';
import PlayerCardsFactory from 'cardGroups/PlayerCardsFactory';
import GroupTypes from 'cardGroups/CardGroupTypes';


import Backend from 'BackendAdapter';


export default class CardManager extends EventEmitter {
    constructor() {
        super();


        /**
         * @type {CardInFieldManager}
         * @private
         */
        this._cardInFieldManager = new CardInFieldManager();


        /**
         * @type {Object.<String, PlayerCards>}
         */
        this._players = PlayerCardsFactory.createPlayerCards(
            Backend.getGameType(),
            Backend.getAllPlayersIds(),
            Backend.getCurrentPlayerId()
        );


        /**
         * @type {Card[]}
         */
        this._cards = {};


        //TODO: remove it to MoveAction class
        Backend.on(Backend.CARD_MOVED, this._onCardMoved.bind(this));
        Backend.on(Backend.CARD_REMOVED, this._onCardRemoved.bind(this));
        Backend.on(Backend.CARD_TAPPED, this._onCardTapped.bind(this));
        Backend.on(Backend.CARD_UNTAPPED, this._onCardUntapped.bind(this));
        Backend.on(Backend.CARD_PLAYED, this._onCardPlayed.bind(this));
        Backend.on(Backend.CARD_PLAYED_AS_ATTACH, this._onCardPlayedAsAttach.bind(this));
        Backend.on(Backend.CARD_PLAYED_AS_SPELL, this._onCardPlayedAsSpell.bind(this));
        Backend.on(Backend.CARD_PLAYED_AS_MANA, this._onCardPlayedAsMana.bind(this));
        Backend.on(Backend.CARD_DIED, this._onCardDied.bind(this));
        Backend.on(Backend.CARD_HEALTH_CHANGED, this._onCardHealthChanged.bind(this));
        Backend.on(Backend.CARD_COUNTER_CHANGED, this._onCardCounterChanged.bind(this));
        Backend.on(Backend.CARD_DRAWN, this._onCardDrawn.bind(this));
        Backend.on(Backend.CARD_ROTATED, this._onCardRotated.bind(this));
        Backend.on(Backend.CARD_CREATED, this._onCardCreated.bind(this));
        Backend.on(Backend.CARD_DISCARDED, this._onCardDiscarded.bind(this));
        Backend.on(
            Backend.CARD_TOOK_FROM_GRAVEYARD,
            this._onCardTookFromGraveyard.bind(this)
        );
        Backend.on(
            Backend.CARD_MOVED_TO_PREVIOUS_GROUP,
            this._onCardMovedToPreviousGroup.bind(this)
        );
        Backend.on(Backend.TIMER_ALARMED_END_OF_TURN, this._onTimerAlarmedEndOfTurn.bind(this));
        Backend.on(Backend.PLAYER_TURN_ENDED, this._onPlayerTurnEnded.bind(this));
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
        if (cardData.cardGroup === GroupTypes.TABLE && cardData.x !== undefined) {
            cardData.onField = true;
        }

        let card = new Card(cardData);
        card.parent = this;

        // Возможно стоит вынести все слушатели в отдельный класс
        card.on(CardEvent.CARD_CLICK, this._onCardClick.bind(this));
        card.on(CardEvent.CARD_DOUBLE_CLICK, this._onCardDoubleClick.bind(this));
        card.on(CardEvent.CARD_RIGHT_CLICK, this._onCardRightClick.bind(this));
        card.on(CardEvent.CARD_MIDDLE_CLICK, this._onCardMiddleClick.bind(this));

        this._addCard(card);

        this._giveCardToPlayer(card, cardData);

        return card;
    }


    /**
     * @param {String} cardGroup
     * @param {Card} card
     * @return {Boolean}
     */
    checkCardIn(cardGroup, card) {
        if (!card) {
            return false;
        }
        return this._currentPlayerCards.checkCardIn(cardGroup, card);
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
        Backend.addEndOfTurnEvent();
    }


    /**
     * @returns {PlayerCards}
     * @private
     */
    get _currentPlayerCards() {
        return this._players[Backend.getCurrentPlayerId()];
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

        if (!card.tapped) {
            alert(
                'Внимание! Кажется произошёл баг с антапом манны. ' +
                'Позовите нас. Если нас нет, то все нажмите F5 и ' +
                'продолжайте играть.'
            );
            console.warn(`Карта ${card.id}, ${card.title} уже тапнута!`);
        }

        card.untap();
    }


    _drawCard(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromDeckToHand(card);
    }


    _discardCard(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardToGraveyard(card);
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


    _playCardAsSpell(id, ownerId) {
        let card = this.findById(id);

        this._players[ownerId].moveCardFromHandToTable(card);
    }


    _playCardAsAttach(playedCardId, targetCardId, ownerId) {
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

        if (oldCardGroup === GroupTypes.HAND) {
            player.moveCardFromHandToDeck(card)
        } else if (oldCardGroup === GroupTypes.TABLE) {
            player.moveCardFromTableToHand(card);
            card.die();

            this._deattachCard(card, ownerId);
        } else if (oldCardGroup === GroupTypes.GRAVEYARD) {
            if (newCardGroup === GroupTypes.TABLE) {
                player.moveCardFromGraveyardToTable(card);
                card.play(card.position);
            } else if (newCardGroup === GroupTypes.HAND) {
                player.moveCardFromGraveyardToHand(card);
            }
        } else if (oldCardGroup === GroupTypes.MANA_POOL) {
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


    _onCardClick(event) {
        var card = event.currentTarget;

        // Если игрок хочет отменить draw/die/play
        var isUndo = PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.Z);
        var isDiscard = PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.D);
        var inDeck = this._currentPlayerCards.checkCardIn(GroupTypes.DECK ,card);
        var inGraveyard = this._currentPlayerCards.checkCardIn(GroupTypes.GRAVEYARD ,card);

        if (isUndo) {
            Backend.moveCardToPreviousGroup(card.id);
            return;
        }

        if (isDiscard) {
            Backend.discardCard(card.id);
            return;
        }

        if (inDeck) {
            Backend.drawCard(card.id);
        } else if (inGraveyard){
            Backend.takeCardFromGraveyard(card.id);
        } else {
            this.emit(CardManagerEvent.CARD_IN_GAME_CLICK, {card: card});
        }
    }


    _onCardDoubleClick(event) {
        let card = event.currentTarget;
        let inHand = this._currentPlayerCards.checkCardIn(GroupTypes.HAND ,card);
        let inTable = this._currentPlayerCards.checkCardIn(GroupTypes.TABLE ,card);

        if (inHand) {
            Backend.putSpellOnTable(card.id);
        } else if (inTable) {
            Backend.playCard(card.id);
        }
    }


    /**
     * HANDLERS
     */
    _onCardRightClick(event) {
        var card = event.currentTarget;
        
        if (this.checkCardIn(GroupTypes.GRAVEYARD, card)) {
            this._currentPlayerCards.showGraveyardList();
        } else if (this.checkCardIn(GroupTypes.DECK, card)) {
            this._currentPlayerCards.showDeckList();
        } else {
            if (card.tapped) {
                Backend.untapCard(card.id);
            } else {
                Backend.tapCard(card.id);
            }    
        }
    }


    _onCardMiddleClick(event) {
        if (event.currentTarget.onField) {
            Backend.rotateCard(event.currentTarget.id);
        } else {
            Backend.playAsMana(event.currentTarget.id);
        }
    }


    //TODO: maybe move all listeners to MoveAction class?
    _onCardMoved(event) {
        var card = this.findById(event.id);
        card.position = event.position;
    }


    _onCardRemoved(event) {
        this._removeCard(event.id);
    }


    _onCardTapped(event) {
        this._tapCard(event.id);
    }


    _onCardUntapped(event) {
        this._untapCard(event.id);
    }


    _onCardPlayed(event) {
        this._playCard(event.id, event.ownerId, event.position, event.playType);
    }


    _onCardPlayedAsAttach(event) {
        this._playCardAsAttach(event.playedCardId, event.targetCardId, event.ownerId);
    }


    _onCardPlayedAsSpell(event) {
        this._playCardAsSpell(event.id, event.ownerId);
    }


    _onCardDrawn(event) {
        this._drawCard(event.id, event.ownerId);
    }


    _onCardDiscarded(event) {
        this._discardCard(event.id, event.ownerId);
    }


    _onCardRotated(event) {
        this._rotateCard(event.id, event.rotated);
    }


    _onCardCreated(event) {
        this.createCard(event.card);
    }

    _onTimerAlarmedEndOfTurn(event) {
        if(event.playerId === Backend.getCurrentPlayerId()) {
            this.endOfTurn();
        }
    }

    _onPlayerTurnEnded(event) {
        if(event.playerId === Backend.getCurrentPlayerId()) {
            var numberOfCardsToDraw = 1;

            //if (BackendAdapter.getGameTurnNumber() >= 6) {
            //    numberOfCardsToDraw = 2;
            //}

            var playerCards = this._players[Backend.getCurrentPlayerId()];
            // Draw cards
            var cardsToDraw = playerCards.getNCardsFromTopDeck(numberOfCardsToDraw);
            cardsToDraw.forEach(c => Backend.drawCard(c.id));
        }
    }

    _onCardPlayedAsMana(event) {
        this._playCardAsMana(event.id, event.ownerId);
    }


    _onCardDied(event) {
        let id = event.id,
            card = this.findById(id),
            ownerId = event.ownerId;

        this._deattachCard(card, ownerId);
        this._dieCard(id, ownerId);
    }


    _onCardHealthChanged(event) {
        this._changeCardHealth(event.id, event.health);
    }


    _onCardCounterChanged(event) {
        this._changeCardCounter(event.id, event.counter);
    }


    _onCardMovedToPreviousGroup(event) {
        this._moveCardToPreviousGroup(
            event.id, event.ownerId, event.oldCardGroup, event.newCardGroup
        );
    }


    _onCardTookFromGraveyard(event) {
        let card = this.findById(event.id);
        var player = this._players[event.ownerId];

        player.moveCardFromGraveyardToHand(card);
    }
}
