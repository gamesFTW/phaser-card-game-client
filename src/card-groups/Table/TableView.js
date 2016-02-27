import CardRowViewManager from './../CardRowViewManager';
import CardView from 'card/CardView';


export default class TableView extends CardRowViewManager {


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
                var y = this._y - 15;
                card.attachedCards.forEach(function(attachedCard) {
                    this.placeCard(attachedCard.cardView, nextX, y);
                    y += -15;
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
