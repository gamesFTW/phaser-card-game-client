import CardManager from './../CardManager';
import HandView from './HandView';


export default class Hand extends CardManager {
    get _cardViews() {
        return this._cards.map(x => x._view);
    }


    constructor() {
        super();

        this._view = new HandView();
        this._view.parent = this;

        //TODO убрать, debug
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();

        this._view.reorderCards(this._cardViews);
    }
}
