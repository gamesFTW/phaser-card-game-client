/**
 * @FileOverview
 *
 *
 */
import EventEmitter from 'external/EventEmitter';


import Hand from './Hand/Hand';
import Deck from './Deck/Deck';
import Graveyard from './Graveyard/Graveyard';
import Table  from './Table/Table';
import ManaPool from './ManaPool/ManaPool';


export default class PlayerCards extends EventEmitter {
    constructor(id, type, decksViewsProperties) {
        super();

        /**
         * @type {String}
         */
        this._id = id;

        /**
         * @type {String} - you|friend|enemy
         */
        this._type = type;

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
     * @param {String} cardGroup
     */
    addCard(card, cardGroup) {
        switch (cardGroup) {
           case 'deck':
               this.addCardToDeck(card);
               break;
           case 'hand':
               this.addCardToHand(card);
               break;
           case 'table':
               this.addCardToTable(card);
               break;
           case 'graveyard':
               this.addCardToGraveyard(card);
               break;
           case 'manaPool':
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


    /**
     * @param {Card} card
     * @return {Boolean}
     */
    checkCardInHand(card) {
        return this._hand.findById(card.id) !== undefined;
    }
}
