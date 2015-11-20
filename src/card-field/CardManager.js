import EventEmitter from 'external/EventEmitter';


import Card from './Card/Card';
//import CreatureCardView from './Card/CreatureCardView';
//import CardView from './Card/CardView';


export default class CardManager extends EventEmitter {
    get _cardViews() {
        return this._cards.map(x => x._view);
    }


    constructor(cards = [], view = null) {
        super();

        this._cards = cards;
        this._view = view;

        // TODO event names via class and getter
        this.on('change', this._onChange.bind(this));
    }


    addRandomCard() {
        let data = {
            id: _.random(10000).toString(),
            title: _.sample(['Жирный орк', 'Тонкий орк', 'Средний орк']),
            type: 'creature',
            text: 'Любит есть',
            dmg: _.sample([1, 2, 3]),
            health: _.sample([1, 3, 4]),
            img: [1,2,3].map(i => 'card/orc' + i)
        };

        this.addCard(data);
    }


    addCard(cardData) {
        let card = new Card(cardData);
        card.parent = this;
        this._cards.push(card);

        this.emit('change', card);
    }


    removeCard(id) {

    }


    _onChange() {
        if (this._view) {
            this._view.reorderCards(this._cardViews);
        }
    }
}
