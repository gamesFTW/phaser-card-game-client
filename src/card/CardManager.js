import EventEmitter from 'external/EventEmitter';
import CardInFieldManager from 'card/Card';
import CardInFieldManager from 'card/CardInFieldManager';


export default class CardManager extends EventEmitter {
    constructor() {
        /**
         * @type {CardInFieldManager}
         * @private
         */
        this._cardInFieldManager = new CardInFieldManager();


        this._cards = {};
    }


    createCard(cardData) {
        let card = new Card(
            cardData.id,
            cardData.x,
            cardData.y
        );
        card.parent = this;

        this.addCard(card);

        return card;
    }


    addCard(card) {
        this._cards[card.id] = card;

        this.putItemTo(creature, {x: creatureParams.x, y: creatureParams.y});
    }
}
