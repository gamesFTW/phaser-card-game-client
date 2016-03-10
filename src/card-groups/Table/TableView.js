import CardRowViewManager from './../CardRowViewManager';
import CardView from 'card/CardView';


export default class TableView extends CardRowViewManager {
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Boolean} adaptive
     * @param {Number} scale - не работает
     * @param {Number} padding
     * @param {Number} maxWidth - если 0 то не ограничено, используется только с adaptive
     * @param {Number} verticalPadding
     */
    constructor({
            x: x, y: y, faceUp: faceUp, adaptive: adaptive = false, scale: scale = 1,
            padding: padding = 5, maxWidth = maxWidth = 0, verticalPadding: verticalPadding}) {
        super(...arguments);


        /**
         * @type {Number}
         */
        this._verticalPadding = verticalPadding;
    }


    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        var attachedCards = this._getAttachedCards(cards);
        var attachedCardsIds = attachedCards.map(c => c.id);
        var notAttachedCards = _.reject(cards, c => _.contains(attachedCardsIds, c.id));

        var nextX = this._x;
        var cardMargin = this.getCardMargin(notAttachedCards.length);

        notAttachedCards.forEach(function(card) {
            this.placeCard(card.cardView, nextX, this._y);

            if(card.attachedCards.length) {
                var y = this._y + this._verticalPadding;
                card.attachedCards.forEach(function(attachedCard) {
                    this.placeCard(attachedCard.cardView, nextX, y);
                    y += this._verticalPadding;
                }.bind(this));
            }

            nextX = nextX + (CardView.CARD_WIDTH + this._padding + cardMargin);
        }.bind(this));
    }


    /**
     * Считает растояние которое нужно поставить между картами(на самом деле между картами и их паддингом)
     * Может быть отрицательным
     * @param {Number} cardsN - кол-во карт
     * @returns {Number}
     */
    getCardMargin(cardsN) {
        var cardsWidth = CardView.CARD_WIDTH * cardsN;
        var paddingWidth = this._padding * (cardsN - 1);
        var totalWidth = (cardsWidth + paddingWidth);

        return this._maxWidth - totalWidth > 0
            ? 0
            : (this._maxWidth - totalWidth) / cardsN;
    }


    /**
     * @param {Card[]} cards
     * @returns {Card[]}
     * @private
     */
    _getAttachedCards(cards) {
        return _(cards).map(c => c.attachedCards)
            .flatten()
            .uniq('id')
            .value();
    }

}
