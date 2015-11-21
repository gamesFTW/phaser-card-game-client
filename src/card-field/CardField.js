/**
 * @FileOverview
 *
 *
 */


import EventEmitter from 'external/EventEmitter';


import Hand from './Hand/Hand';
import Deck from './Deck/Deck';


export default class CardField extends EventEmitter {
    constructor() {
        super();

        this.hand = new Hand();
        this.hand.parent = this;

        this.deck = new Deck();
        this.deck.parent = this;
    }

}
