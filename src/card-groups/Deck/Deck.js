import CardGroupManager from './../CardGroupManager';
import DeckView from './DeckView';


export default class Deck extends CardGroupManager {
    constructor(viewProperties) {
        super();


        this._view = new DeckView(viewProperties);
        this._view.parent = this;
    }
}
