import CardViewManager from './CardViewManager';
import CardView from './Card/CardView';


export default class CardRowViewManager extends CardViewManager {
    get nextCardPosition() {
        let cards = this._cards.length;
        let cardsWidth = CardView.CARD_WIDTH * this._scale * cards;
        let cardsPadding = this._padding * cards;
        let x = this._x + cardsPadding + cardsWidth;
        return { x: x, y: this._y };
    }


    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Boolean} draggable
     * @param {Number} scale
     * @param {Number} padding
     */
    constructor(x, y, faceUp, draggable = false, scale = 1, padding = 3) {
        super(x, y, faceUp, draggable, scale, padding);
    }


    /**
     *
     * @param {CardView[]} cardsViews
     */
    reorderCards(cardsViews) {
        var nextX = this._x;

        cardsViews.forEach(function(cardView) {
            this.placeCard(cardView, nextX, this._y);

            nextX = nextX + (CardView.CARD_WIDTH + this._padding) * this._scale;
        }.bind(this));
    }
}
