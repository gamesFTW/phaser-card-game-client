import EventEmitter from 'external/EventEmitter';
import CardView from 'card/CardView';
import CreatureView from 'card/CreatureView';
import CardEvent from 'card/CardEvent';
import CardViewEvent from 'card/CardViewEvent';
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
        this._color = data.color;

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
         * @type {Boolean}
         */
        this._isTapped = data.isTapped;

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


        this._cardView = null;

        this._createCardView(data);
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

        if (this._fieldView) {
            this._fieldView.position = point;
        }
    }


    dispose() {
        this._cardView.dispose();

        if (this._fieldView) {
            this._fieldView.dispose();
        }

        this.emit(CardEvent.DISPOSE);
    }


    tap() {
        this._isTapped = true;
        this._cardView.tap();
    }


    untap() {
        this._isTapped = false;
        this._cardView.untap();
    }


    play(position) {
        this._createFieldView();
        this.position = position;
    }


    _highlightOn() {
        if (this._fieldView) {
            this._fieldView.highlightOn();
        }
        this._cardView.highlightOn();
    }


    _highlightOff() {
        if (this._fieldView) {
            this._fieldView.highlightOff();
        }
        this._cardView.highlightOff();
    }


    _createCardView(data) {
        this._cardView = new CardView(data);
        this._cardView.parent = this;

        this._cardView.on(
            CardViewEvent.CLICK, this._onCardViewClick.bind(this)
        );

        this._cardView.on(
            CardViewEvent.CTRL_CLICK, this._onCardViewCtrlClick.bind(this)
        );

        this._cardView.on(
            CardViewEvent.OVER, this._onCardViewOver.bind(this)
        );

        this._cardView.on(
            CardViewEvent.OUT, this._onCardViewOut.bind(this)
        );
    }


    _createFieldView() {
        this._fieldView = new CreatureView(this._x, this._y, this._color);
        this._fieldView.parent = this;
        this._isOnField = true;

        this._fieldView.on(
            FiledObjectsViewEvent.CLICK, this._onFieldViewClick.bind(this)
        );

        this._fieldView.on(
            FiledObjectsViewEvent.OVER, this._onFieldViewOver.bind(this)
        );

        this._fieldView.on(
            FiledObjectsViewEvent.OUT, this._onFieldViewOut.bind(this)
        );
    }

    // Field view handlers
    _onFieldViewClick(event) {
        this.emit(CardEvent.FIELD_CLICK);
    }


    _onFieldViewOver(event) {
        this._highlightOn();
    }


    _onFieldViewOut(event) {
        this._highlightOff();
    }


    // Card view handlers
    _onCardViewClick(event) {
        this.emit(CardEvent.CARD_CLICK);
    }


    _onCardViewOver(event) {
        this._highlightOn();
    }


    _onCardViewOut(event) {
        this._highlightOff();
    }


    _onCardViewCtrlClick(event) {
        if (this._isTapped) {
            this.emit(CardEvent.PRESS_UNTAP);
        } else {
            this.emit(CardEvent.PRESS_TAP);
        }
    }
}
