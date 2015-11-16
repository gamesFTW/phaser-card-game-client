import EventEmitter from 'external/EventEmitter';


import CreatureCardView from './CreatureCardView';
import BaseCardView from './BaseCardView';


export default class BaseCardViewManager extends EventEmitter {
    get nextCardPosition() {
        let cards = this._cards.length;
        let cardsWidth = BaseCardView.CARD_WIDTH * this._sacle * cards;
        let cardsPadding = this._padding * cards;
        let x = this._x + cardsPadding + cardsWidth;
        return { x: x, y: this._y };
    }


    constructor(x, y, scale = 1, padding = 3) {
        super();

        this._x = x;
        this._y = y;
        this._sacle = scale;
        this._padding = padding;

        this._cards = [];
    }

    addRandomCard() {
        let data = {
            id: _.random(10000).toString(),
            title: _.sample(['Жирный окр', 'Тонкий орк', 'Средний окр']),
            type: 'creature',
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

        this._cards.push(card);
    }


    removeCard() {

    }
}
