import EventEmitter from 'external/EventEmitter';


import Card from './Card/Card';
//import CreatureCardView from './Card/CreatureCardView';
//import CardView from './Card/CardView';


export default class CardManager extends EventEmitter {
    constructor() {
        super();

        this._cards = [];
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
    }


    removeCard(id) {

    }
}
