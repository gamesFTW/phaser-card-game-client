import CardRowViewManager from './../CardRowViewManager';


export default class TableView extends CardRowViewManager {
    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        var cardsViews = cards.map(card => card.cardView);
        var nextX = this._x;

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
    }
}
