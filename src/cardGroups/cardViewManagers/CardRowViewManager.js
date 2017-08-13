import CardViewManager from './CardViewManager';
import CardView from './../../card/CardView';


export default class CardRowViewManager extends CardViewManager {
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Boolean} adaptive
     * @param {Number} scale - не работает
     * @param {Number} padding
     * @param {Number} maxWidth - если 0 то не ограничено, используется только с adaptive
     */
    constructor({x: x, y: y, faceUp: faceUp, adaptive: adaptive = false,
                scale: scale = 1, padding: padding = 5, maxWidth = maxWidth = 0}) {
        super(...arguments);
        this._scale = scale;
        this._adaptive = adaptive;
        this._padding = padding;
        this._maxWidth = maxWidth;
    }


    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        var cardsViews = cards.map(card => card.cardView);
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

                // Я просто подобрал эту переменную. Ну и что? Кто меня за это осудит?
                let MEGA_CONST = 2;
                nextX = nextX + (CardView.CARD_WIDTH + this._padding + cardOverlay - MEGA_CONST);
            }.bind(this));

        } else {
            cardsViews.forEach(function(cardView) {
                this.placeCard(cardView, nextX, this._y);

                nextX = nextX + (CardView.CARD_WIDTH + this._padding);
            }.bind(this));
        }
    }
}
