/**
 * @FileOverview
 *
 *
 */
import EventEmitter from 'external/EventEmitter';

import CardGroupTypes from './CardGroupTypes'; 
import Hand from './hand/Hand';
import Deck from './deck/Deck';
import Graveyard from './graveyard/Graveyard';
import Table  from './table/Table';
import ManaPool from './manaPool/ManaPool';


export default class PlayerCards extends EventEmitter {
    constructor(id, decksViewsProperties) {
        super();

        /**
         * @type {String}
         */
        this._id = id;

        this._hand = new Hand(decksViewsProperties.hand);
        this._hand.parent = this;

        this._deck = new Deck(decksViewsProperties.deck);
        this._deck.parent = this;


        this._table = new Table(decksViewsProperties.table);
        this._table.parent = this;

        this._graveyard = new Graveyard(decksViewsProperties.graveyard);
        this._graveyard.parent = this;

        this._manaPool = new ManaPool(decksViewsProperties.manaPool);
        this._manaPool.parent = this;

        this._cardGroupMapping = {
            [`${CardGroupTypes.DECK}`]: this._deck,
            [`${CardGroupTypes.HAND}`]: this._hand,
            [`${CardGroupTypes.TABLE}`]: this._table,
            [`${CardGroupTypes.GRAVEYARD}`]: this._graveyard,
            [`${CardGroupTypes.MANA_POOL}`]: this._manaPool
        };
    }


    /**
     *
     * @param {Card} card
     * @param {CardGroupTypes} cardGroup
     */
    addCard(card, cardGroup) {
        switch (cardGroup) {
           case CardGroupTypes.DECK:
               this.addCardToDeck(card);
               break;
           case CardGroupTypes.HAND:
               this.addCardToHand(card);
               break;
           case CardGroupTypes.TABLE:
               this.addCardToTable(card);
               break;
           case CardGroupTypes.GRAVEYARD:
               this.addCardToGraveyard(card);
               break;
           case CardGroupTypes.MANA_POOL:
               this.addCardToManaPool(card);
               break;
        }
    }


    /**
     * @param {Card} card
     */
    removeCardFromCurrentCardGroup(card) {
        var currentCardGroup = this.getCardGroupByCard(card);
        this._cardGroupMapping[currentCardGroup].removeCard(card);
    }


    addCardToDeck(card) {
        this._deck.addCard(card);
    }


    addCardToTable(card) {
        this._table.addCard(card);
    }


    addCardToGraveyard(card) {
        this._graveyard.addCard(card);
    }


    addCardToManaPool(card) {
        this._manaPool.addCard(card);
    }


    addCardToHand(card) {
        this._hand.addCard(card);
    }


    moveCardFromHandToTable(card) {
        this._hand.removeCard(card);
        this._table.addCard(card);
    }


    moveCardFromHandToManaPool(card) {
        this._hand.removeCard(card);
        this._manaPool.addCard(card);
    }


    moveCardFromTableToGraveyard(card) {
        this._table.removeCard(card);
        this._graveyard.addCard(card);
    }


    moveCardFromDeckToHand(card) {
        this._deck.removeCard(card);
        this._hand.addCard(card);
    }


    moveCardFromHandToDeck(card) {
        this._hand.removeCard(card);
        this._deck.addCardToTop(card);
    }


    moveCardFromTableToHand(card) {
        this._table.removeCard(card);
        this._hand.addCard(card);
    }


    moveCardFromGraveyardToTable(card) {
        this._graveyard.removeCard(card);
        this._table.addCard(card);
    }


    moveCardFromGraveyardToHand(card) {
        this._graveyard.removeCard(card);
        this._hand.addCard(card);
    }


    moveCardFromManaPoolToHand(card) {
        this._manaPool.removeCard(card);
        this._hand.addCard(card);
    }
    
    
    moveCardToGraveyard(card) {
        this.removeCardFromCurrentCardGroup(card);
        this.addCard(card, CardGroupTypes.GRAVEYARD);
    }


    /**
     * @param {String} cardGroup 
     * @param {Card} card
     * @return {Boolean}
     */
    checkCardIn(cardGroup, card) {
        switch (cardGroup) {
            case CardGroupTypes.DECK:
                return this._deck.findById(card.id) !== undefined;
            case CardGroupTypes.HAND:
                return this._hand.findById(card.id) !== undefined;
            case CardGroupTypes.TABLE:
                return this._table.findById(card.id) !== undefined;
            case CardGroupTypes.GRAVEYARD:
                return this._graveyard.findById(card.id) !== undefined;
            case CardGroupTypes.MANA_POOL:
                return this._manaPool.findById(card.id) !== undefined;
        }
    }


    /**
     * @param {Card} card
     * @return {CardGroupTypes|null}
     */
    getCardGroupByCard(card) {
        var currentCardGroup = null;
        _.forEach(this._cardGroupMapping, (cardGroupManager, cardGroup) => {
            if (cardGroupManager.findById(card.id) !== undefined) {
                currentCardGroup = cardGroup;
                return false;
            }
        });

        return currentCardGroup;
    }


    getNCardsFromTopDeck(n) {
        return this._deck.getNCardsFromTop(n);
    }


    getAllCardsFromTable() {
        return this._table.cards;
    }


    getTappedCardsFromManaPool() {
        return _.filter(this._manaPool.cards, c => c.tapped);
    }


    showDeckList() {
        this._deck.showList();
    }


    showGraveyardList() {
        this._graveyard.showList();
    }
}
