import EventEmitter from 'external/EventEmitter';


export default class FieldObject extends EventEmitter {
    /**
     * @returns {String}
     */
    get id() { return this._id; }


    /**
     * @returns {Object}
     */
    get position() { return {x: this._x, y: this._y}; }


    /**
     * @param {Object} point
     */
    set position(point) {
        [this._x, this._y] = [point.x, point.y];

        this._view.position = point;
    }


    constructor(id, x, y) {
        super();

        /**
         * @type {String}
         */
        this._id = id;

        /**
         * @type {int}
         */
        this._x = x;

        /**
         * @type {int}
         */
        this._y = y;

        /**
         * @type {FieldObjectView}
         * @protected
         */
        this._view = null;
    }
}
