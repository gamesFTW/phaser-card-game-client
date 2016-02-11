import CardStackViewManager from './../CardStackViewManager';


export default class GraveyardView extends CardStackViewManager {
    /**
     * @override
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        var cardsViews = cards.map(card => card.cardView);
        let lastCardView = _.last(cardsViews);
        lastCardView && this.placeCard(lastCardView, this._x, this._y);
        lastCardView && ( lastCardView.visible = true );

        _.slice(cardsViews, 0, -1).forEach(cv => cv.visible = false);
    }
}
