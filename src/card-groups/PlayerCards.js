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






export default class PlayerCards extends EventEmitter {
    constructor(id, type) {
        super();

        /**
         * @type {String}
         */
        this._id = id;

        /**
         * @type {String} - you|friend|enemy
         */
        this._type = type;

        this._hand = new Hand();
        this._hand.parent = this;

        this._deck = new Deck();
        this._deck.parent = this;


        this._table = new Table();
        this._table.parent = this;

        //this.graveyard = new Graveyard();
        //this.graveyard.parent = this;
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


    addCardToHand(card) {
        this._hand.addCard(card);
    }


    moveCardFromHandToTable(card) {
        this._hand.removeCard(card);
        this._table.addCard(card);
    }
}
