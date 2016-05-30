import CardGroupManager from './../CardGroupManager';
import GraveyardView from './GraveyardView';
import ListView from 'cardGroups/cardViewManagers/ListView';


export default class Graveyard extends CardGroupManager {
    constructor(viewProperties) {
        super();

        this._view = new GraveyardView(viewProperties);
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
