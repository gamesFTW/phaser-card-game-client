import CardRowViewManager from './../cardViewManagers/CardRowViewManager';


export default class HandView extends CardRowViewManager {


    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        super.reorderCards(cards);
        cards.forEach(card => card.cardView.visible = true);
    }
}
