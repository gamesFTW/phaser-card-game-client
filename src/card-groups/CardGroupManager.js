import EventEmitter from 'external/EventEmitter';


export default class CardGroupManager extends EventEmitter {
    get _cardViews() {
        return this._cards.map(x => x._cardView);
    }


    constructor(cards = [], view = null) {
        super();

        this._cards = cards;
        this._view = view;

        // TODO event names via class and getter
        this.on('change', this._onChange.bind(this));
    }

    /**
     * @param {Card} card
     */
    addCard(card) {
        this._cards.push(card);

        // TODO нормальные эвенты
        this.emit('change');
    }

    _onChange() {
        if (this._view) {
            this._view.reorderCards(this._cardViews);
        }
    }
}
