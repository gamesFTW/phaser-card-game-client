/**
 * @FileOverview
 *
 *
 */


import EventEmitter from 'external/EventEmitter';


import Hand from './Hand/Hand';


export default class CardManager extends EventEmitter {
    constructor() {
        super();

        this.hand = new Hand();
        this.hand.parent = this;
    }


}
