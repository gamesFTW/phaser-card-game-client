import _ from 'lodash';


import CardViewManager from './CardViewManager';


export default class CardStackViewManager extends CardViewManager {
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Boolean} draggable
     * @param {Number} scale
     */
    constructor(x, y, faceUp, draggable = false, scale = 1) {
        super(x, y, faceUp, draggable, scale, 0);
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
