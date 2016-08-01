import CardGroupManager from 'cardGroups/CardGroupManager';
import DeckView from './DeckView';
import ListView from 'cardGroups/cardViewManagers/ListView';
import GlobalEvent from 'GlobalEvent';


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


        this._view.on(GlobalEvent.ESC_PRESSED, this._viewEscPressedHandler.bind(this));
    }


    showList() {
        this._listView = new ListView({});

        this._listView.reorderCards(this._cards);
    }


    closeList() {
        this._listView = null;
        this.redraw();
    }


    _viewEscPressedHandler() {
        if (this._listView !== null) {
            this.closeList();
        }
    }
}
