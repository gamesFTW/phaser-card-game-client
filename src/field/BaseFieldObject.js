import EventEmitter from 'external/EventEmitter';


export default class BaseFieldObject extends EventEmitter {
    /**
     * @returns {String}
     */
    get id() { return this._id; }


    /**
     * @returns {object}
     */
    get position() { return {x: this._x, y: this._y}; }


    /**
     * @type {object} value
     */
    set position(value) {
        this._x = value.x;
        this._y = value.y;

        this._view.position = value;
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
         * @type {BaseFieldObjectView}
         * @protected
         */
        this._view = null;
    }
}
