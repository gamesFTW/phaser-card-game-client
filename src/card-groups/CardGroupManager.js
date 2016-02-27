import EventEmitter from 'external/EventEmitter';
import _ from 'lodash';


export default class CardGroupManager extends EventEmitter {
    get _cardViews() {
        return this._cards.map(x => x._cardView);
    }


    get cards() {
        return _.clone(this._cards);
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


    /**
     * @param {Card} card
     */
    addCardToTop(card) {
        this._cards.unshift(card);

        // TODO нормальные эвенты
        this.emit('change');
    }


    /**
     * @param {Card} card
     */
    removeCard(card) {
        this._cards = _.reject(this._cards, {id: card.id });

        // TODO нормальные эвенты
        this.emit('change');
    }


    /**
     * @param {Number} id
     */
    findById(id) {
        return _.find(this._cards, { id: id });
    }


    getNCardsFromTop(n) {
        return _.slice(this._cards, 0, n);
    }


    redraw() {
        if (this._view) {
            this._view.reorderCards(this._cards);
        }
    }


    _onChange() {
        this.redraw();
    }
}
