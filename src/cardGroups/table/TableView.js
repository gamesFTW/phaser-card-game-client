import CardRowViewManager from './../cardViewManagers/CardRowViewManager';
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
     * WARNING reorderCards вызывается столько раз сколько карт в руке у плеера, при каждом добавлении карты. =( это баг
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        var attachedCards = this._getAttachedCards(cards);
        var attachedCardsIds = attachedCards.map(c => c.id);
        var notAttachedCards = _.reject(cards, c => _.contains(attachedCardsIds, c.id));

        var nextX = this._x;
        var currentType = null;
        
        var numberOfGapsBetweenTypes = this._getNumberOfGapsBetweenType(notAttachedCards);
        var cardMargin = this.getCardMargin(notAttachedCards.length + numberOfGapsBetweenTypes);
        
        notAttachedCards = this._groupCardsByType(notAttachedCards);

        notAttachedCards.forEach(function(card) {
            
            if (card.type !== currentType) {
                if (currentType !== null) {
                    nextX += this._calculatePaddingForCard(cardMargin);
                }
                currentType = card.type;
            }
            
            this.placeCard(card.cardView, nextX, this._y);

            this._replaceAttachedCardToTarget(card, nextX);

            nextX += this._calculatePaddingForCard(cardMargin);
        }.bind(this));
    }
    
    _calculatePaddingForCard(cardMargin) {
        // Нужно чтобы карты не залазили за экран
        // Я просто подобрал эту переменную. Ну и что? Кто меня за это осудит?
        let MEGA_CONST = 2;
        return CardView.CARD_WIDTH + this._padding + cardMargin - MEGA_CONST;
    }
    
    _getNumberOfGapsBetweenType(cards) {
        let groups = _.keys(_.groupBy(cards, 'type'));
        return groups.length == 0 ? 0 : groups.length -1;
    }
    
    _replaceAttachedCardToTarget(card, nextX) {
        if(card.attachedCards.length) {
            var y = this._y + this._verticalPadding;
            card.attachedCards.forEach((attachedCard) => {
                this.placeCard(attachedCard.cardView, nextX, y);
                y += this._verticalPadding;
            });
        }
    }

    _groupCardsByType(cards) {
        let groups = _.groupBy(cards, 'type');

        let heroes = _.remove(groups['creature'] || [], 'hero');

        return _.compact([].concat(
            heroes,
            groups['creature'],
            groups['spell'],
            groups['area']
        ));
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
