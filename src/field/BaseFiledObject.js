var EventEmitter = require('external/EventEmitter');


export default class BaseFiledObject extends EventEmitter {
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


    constructor(x, y) {
        super();

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
