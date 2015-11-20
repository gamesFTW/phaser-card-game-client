import EventEmitter from 'external/EventEmitter';


import CardView from './CardView';


export default class Card extends EventEmitter {
    constructor(data) {
        super();

        this._view = new CardView(data);
        this._view.parent = this;
    }
}
