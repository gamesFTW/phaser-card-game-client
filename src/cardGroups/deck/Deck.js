import CardGroupManager from 'cardGroups/CardGroupManager';
import DeckView from './DeckView';
import ListView from 'cardGroups/cardViewManagers/ListView';


export default class Deck extends CardGroupManager {
    constructor(viewProperties) {
        super();


        this._view = new DeckView(viewProperties);
        this._view.parent = this;


        /**
         * @type {ListView}
         * @private
         */
        this._listView = null;
    }


    showList() {
        this._listView = new ListView({});

        this._listView.reorderCards(this._cards);
    }
}
