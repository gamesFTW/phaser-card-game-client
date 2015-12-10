import CardGroupManager from './../CardGroupManager';
import DeckView from './DeckView';


export default class Deck extends CardGroupManager {
    constructor() {
        super();


        this._view = new DeckView();
        this._view.parent = this;
    }
}
