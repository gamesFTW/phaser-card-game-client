import CardRowViewManager from './CardRowViewManager';
import _ from 'lodash';


export default class ListView extends CardRowViewManager {
    constructor({x: x = 50, y: y = 430, faceUp: faceUp = true,
                adaptive: adaptive = true, maxWidth = maxWidth = 1580}) {
        super({x, y, faceUp, adaptive, maxWidth});
    }


    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        cards = _.shuffle(cards);
        cards.forEach(card => card.cardView.visible = false);
        cards.forEach(card => card.cardView.position = { x: this._x, y: this._y });
        cards.forEach(card => card.cardView.visible = true);

        super.reorderCards(cards);
    }
}
