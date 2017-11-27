import CardRowViewManager from './../cardViewManagers/CardRowViewManager';


export default class HandView extends CardRowViewManager {
    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        cards = lodash.sortByAll(cards, ['mana', 'title']);

        cards.forEach(card => card.cardView.visible = true);
        super.reorderCards(cards);
    }
}
