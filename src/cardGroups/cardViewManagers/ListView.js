import CardRowViewManager from './CardRowViewManager';
import _ from 'lodash';


export default class ListView extends CardRowViewManager {
    constructor({x: x = 100, y: y = 200, faceUp: faceUp = true,
                adaptive: adaptive = true, maxWidth = maxWidth = 900}) {
        super({x, y, faceUp, adaptive, maxWidth});
    }


    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        cards = _.shuffle(cards);
        cards.forEach(card => card.cardView.visible = false);
        cards.forEach(card => card.cardView.position = {x: 100, y: 200});
        cards.forEach(card => card.cardView.visible = true);

        super.reorderCards(cards);
    }
}
