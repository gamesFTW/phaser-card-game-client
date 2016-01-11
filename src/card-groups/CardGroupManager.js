import EventEmitter from 'external/EventEmitter';
import _ from 'lodash';


export default class CardGroupManager extends EventEmitter {
    get _cardViews() {
        return _.values(this._cards).map(x => x._cardView);
    }


    constructor(cards = [], view = null) {
        super();

        this._cards = _.transform(cards, function(obj, card) {
            obj[card.id] = card;
        }, {});
        this._view = view;

        // TODO event names via class and getter
        this.on('change', this._onChange.bind(this));
    }


    /**
     * @param {Card} card
     */
    addCard(card) {
        this._cards[card.id] = card;

        // TODO нормальные эвенты
        this.emit('change');
    }


    /**
     * @param {Card} card
     */
    removeCard(card) {
        delete this._cards[card.id];

        // TODO нормальные эвенты
        this.emit('change');
    }


    /**
     * @param {Number} id
     */
    findById(id) {
        return this._cards[id];
    }


    _onChange() {
        if (this._view) {
            this._view.reorderCards(this._cardViews);
        }
    }
}
