import CardViewManager from './CardViewManager';
import CardView from './../card/CardView';


export default class CardRowViewManager extends CardViewManager {




    /**
     *
     * @param {CardView[]} cardsViews
     */
    reorderCards(cardsViews) {
        var nextX = this._x;

        if (this._adaptive && this._maxWidth) {
            var cardsN = cardsViews.length;
            var cardsWidth = CardView.CARD_WIDTH * cardsN;
            var paddingWidth = this._padding * (cardsN - 1);
            var totalWidth = (cardsWidth + paddingWidth);

            var cardOverlay = this._maxWidth - totalWidth > 0
                ? 0
                : (this._maxWidth - totalWidth) / cardsN;

            cardsViews.forEach(function(cardView) {
                this.placeCard(cardView, nextX, this._y);

                nextX = nextX + (CardView.CARD_WIDTH + this._padding + cardOverlay);
            }.bind(this));

        } else {
            cardsViews.forEach(function(cardView) {
                this.placeCard(cardView, nextX, this._y);

                nextX = nextX + (CardView.CARD_WIDTH + this._padding);
            }.bind(this));
        }
    }
}
