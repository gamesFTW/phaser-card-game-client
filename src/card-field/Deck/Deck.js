import CardManager from './../CardManager';
import DeckView from './DeckView';


export default class Deck extends CardManager {
    constructor() {
        super();


        this._view = new DeckView();
        this._view.parent = this;

        //TODO убрать, debug
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
    }
}
