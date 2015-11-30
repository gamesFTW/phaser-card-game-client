import CardManager from './../CardGroupManager';
import DeckView from './DeckView';


export default class Deck extends CardManager {
    constructor() {
        super();


        this._view = new DeckView();
        this._view.parent = this;
    }
}
