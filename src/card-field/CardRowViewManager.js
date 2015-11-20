import EventEmitter from 'external/EventEmitter';
import CardView from './Card/CardView';


export default class CardRowViewManager extends EventEmitter {
    get nextCardPosition() {
        let cards = this._cards.length;
        let cardsWidth = CardView.CARD_WIDTH * this._scale * cards;
        let cardsPadding = this._padding * cards;
        let x = this._x + cardsPadding + cardsWidth;
        return { x: x, y: this._y };
    }


    constructor(x, y, draggable = false, scale = 1, padding = 3) {
        super();

        this._x = x;
        this._y = y;
        this._scale = scale;
        this._padding = padding;

        this._draggable = draggable;
    }


    /**
     *
     * @param {CardView[]} cardsViews
     */
    reorderCards(cardsViews) {
        var nextX = this._x;

        cardsViews.forEach(function(card) {
            card.position = { x: nextX, y: this._y};

            // Наверное нужно делать только еще не делали до этого
            if (this._draggable)
                card.enableDragAndDrop();

            nextX = nextX + (CardView.CARD_WIDTH + this._padding) * this._scale;
        }.bind(this));

    }

}
