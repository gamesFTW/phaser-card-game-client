import _ from 'lodash';


import EventEmitter from 'external/EventEmitter';


export default class CardViewManager extends EventEmitter {
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Boolean} adaptive
     * @param {Number} scale - не работает
     * @param {Number} padding
     * @param {Number} maxWidth - если 0 то не ограничено, используется только с adaptive
     */
    constructor({x: x, y: y, faceUp: faceUp, adaptive: adaptive = false, scale: scale = 1, padding: padding = 5, maxWidth = maxWidth = 0}) {
        super();

        this._x = x;
        this._y = y;
        this._scale = scale;
        this._adaptive = adaptive;
        this._padding = padding;
        this._maxWidth = maxWidth;
        this._faceUp = faceUp;

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
