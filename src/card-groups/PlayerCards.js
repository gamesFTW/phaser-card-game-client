/**
 * @FileOverview
 *
 *
 */
import EventEmitter from 'external/EventEmitter';

import GroupTypes from './CardGroupTypes'; 
import Hand from './Hand/Hand';
import Deck from './Deck/Deck';
import Graveyard from './Graveyard/Graveyard';
import Table  from './Table/Table';
import ManaPool from './ManaPool/ManaPool';


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
    }


    /**
     *
     * @param {Card} card
     * @param {CardGroupTypes} cardGroup
     */
    addCard(card, cardGroup) {
        switch (cardGroup) {
           case GroupTypes.DECK:
               this.addCardToDeck(card);
               break;
           case GroupTypes.HAND:
               this.addCardToHand(card);
               break;
           case GroupTypes.TABLE:
               this.addCardToTable(card);
               break;
           case GroupTypes.GRAVEYARD:
               this.addCardToGraveyard(card);
               break;
           case GroupTypes.MANA_POOL:
               this.addCardToManaPool(card);
               break;
        }
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


    /**
     * @param {String} cardGroup 
     * @param {Card} card
     * @return {Boolean}
     */
    checkCardIn(cardGroup, card) {
        switch (cardGroup) {
            case GroupTypes.DECK:
                return this._deck.findById(card.id) !== undefined;
            case GroupTypes.HAND:
                return this._hand.findById(card.id) !== undefined;
            case GroupTypes.TABLE:
                return this._table.findById(card.id) !== undefined;
            case GroupTypes.GRAVEYARD:
                return this._graveyard.findById(card.id) !== undefined;
            case GroupTypes.MANA_POOL:
                return this._manaPool.findById(card.id) !== undefined;
        }
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
}
