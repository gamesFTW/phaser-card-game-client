import EventEmitter from 'external/EventEmitter';


import CreatureCardView from './CreatureCardView';
import BaseCardView from './BaseCardView';


export default class BaseCardViewManager extends EventEmitter {
    get nextCardPosition() {
        let cards = this._cards.length;
        let cardsWidth = BaseCardView.CARD_WIDTH * this._scale * cards;
        let cardsPadding = this._padding * cards;
        let x = this._x + cardsPadding + cardsWidth;
        return { x: x, y: this._y };
    }


    constructor(x, y, scale = 1, padding = 3) {
        super();

        this._x = x;
        this._y = y;
        this._scale = scale;
        this._padding = padding;

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
        let { x,y }  = this.nextCardPosition;
        //Здесь может быть не только креачур
        let card = new CreatureCardView(x, y, cardData);
        card.parent = this;

        this._cards.push(card);
    }


    removeCard(id) {

    }


    reorderCards() {
        var nextX = this._x;
        let nextY = this._y;
        let padding = this._padding;
        let scale = this._scale;

        this._cards.forEach(function(card) {
            card.position = { x: nextX, y: nextY };

            nextX = nextX + (BaseCardView.CARD_WIDTH + padding) * scale;
        });

    }
}
