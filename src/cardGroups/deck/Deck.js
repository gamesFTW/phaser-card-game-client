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
    
    removeCard(card) {
        super.removeCard(card);
       
        // Ставим карту туда где находится дека, чтобы была анимация получения карты из дека
        card._cardView.position = this._view.position;
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
