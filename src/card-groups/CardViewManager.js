import _ from 'lodash';


import EventEmitter from 'external/EventEmitter';


export default class CardViewManager extends EventEmitter {
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Boolean} draggable
     * @param {Number} scale
     * @param {Number} padding
     */
    constructor({x: x, y: y, faceUp: faceUp, draggable: draggable = false, scale: scale = 1, padding: padding = 5}) {
        super();

        this._x = x;
        this._y = y;
        this._scale = scale;
        this._padding = padding;
        this._faceUp = faceUp;

        this._draggable = draggable;
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

        // Наверное нужно делать только еще не делали до этого
        if (this._draggable) {
            cardView.enableDragAndDrop();
        }

        cardView.faceUp = this._faceUp;
    }
}
