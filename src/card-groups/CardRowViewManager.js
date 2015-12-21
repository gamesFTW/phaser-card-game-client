import CardViewManager from './CardViewManager';
import CardView from './../card/CardView';


export default class CardRowViewManager extends CardViewManager {
    get nextCardPosition() {
        let cards = this._cards.length;
        let cardsWidth = CardView.CARD_WIDTH * this._scale * cards;
        let cardsPadding = this._padding * cards;
        let x = this._x + cardsPadding + cardsWidth;
        return { x: x, y: this._y };
    }


    /**
     */
    constructor(properties) {
        super(properties);
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
