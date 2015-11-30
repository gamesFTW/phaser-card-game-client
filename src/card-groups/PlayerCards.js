/**
 * @FileOverview
 *
 *
 */


import EventEmitter from 'external/EventEmitter';


import Hand from './Hand/Hand';
import Deck from './Deck/Deck';


export default class PlayerCards extends EventEmitter {
    constructor(id, type) {
        super();

        /*
         * @type {String}
         */
        this._id = id;

        /*
         * @type {String} - you|friend|enemy
         */
        this._type = type;

        this._hand = new Hand();
        this._hand.parent = this;

        this._deck = new Deck();
        this._deck.parent = this;

        //this.graveyard = new Graveyard();
        //this.graveyard.parent = this;
    }

}
