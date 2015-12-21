import _ from 'lodash';


import CardViewManager from './CardViewManager';


export default class CardStackViewManager extends CardViewManager {
    /**
     *
     */
    constructor(properties) {
        super(properties);
    }


    /**
     *
     * @param {CardView[]} cardsViews
     */
    reorderCards(cardsViews) {
        let firstCardView = _.first(cardsViews);
        this.placeCard(firstCardView, this._x, this._y);

        _.rest(cardsViews).forEach(cv => cv.visible = false);
    }
}
