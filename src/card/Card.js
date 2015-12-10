import EventEmitter from 'external/EventEmitter';
import CardView from 'card/CardView';
import CreatureView from 'card/CreatureView';
import CardEvent from 'card/CardEvent';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';


export default class Card extends EventEmitter {
    /**
     *
     * @param {Object} data
     * @param {Number} data.x
     * @param {Number} data.y
     * @param {String} data.id
     * @param {Boolean} data.isOnField
     */
    constructor(data) {
        super();

        /**
         * @type {String}
         */
        this._id = data.id;

        /**
         * @type {int}
         */
        this._x = data.x;

        /**
         * @type {int}
         */
        this._y = data.y;

        /**
         * @type {Boolean}
         */
        this._isOnField = data.isOnField;

        /**
         * @type {CardView}
         * @protected
         */
        this._cardView = null;

        /**
         * @type {FieldObjectView}
         * @protected
         */
        this._fieldView = null;


        this._cardView = new CardView(data);
        this._cardView.parent = this;

        if (this._isOnField) {
            this._createFieldView();
        }
    }


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

        this._fieldView.position = point;
    }


    dispose() {
        this._cardView.dispose();

        if (this._fieldView) {
            this._fieldView.dispose();
        }

        this.emit(CardEvent.DISPOSE);
    }


    _createFieldView() {
        this._fieldView = new CreatureView(this._x, this._y);
        this._fieldView.parent = this;
        this._isOnField = true;

        this._fieldView.on(
            FiledObjectsViewEvent.CLICK, this._fieldViewClick.bind(this)
        );
    }


    _fieldViewClick(event) {
        this.emit(CardEvent.CLICK);
    }
}

