import _ from 'lodash';


import EventEmitter from 'external/EventEmitter';


export default class CardViewManager extends EventEmitter {
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     */
    constructor({x: x, y: y, faceUp: faceUp}) {
        super();

        this._x = x;
        this._y = y;
        this._faceUp = faceUp;

    }

    get position() {
        return { x: this._x, y: this._y };
    }

    /**
     *
     * @param {CardView[]} cardsViews
     */
    render(cardsViews) {
        console.error('not implemented');
    }

    /**
     *
     * @param {CardView} cardView
     * @param {Number} x
     * @param {Number} y
     */
    placeCard(cardView, x, y) {
        cardView.position = { x: x, y: y };

        cardView.faceUp = this._faceUp;
    }
}
