import EventEmitter from 'external/EventEmitter';
import CardView from 'card/CardView';
import CardFullView from 'card/CardFullView';
import CreatureView from 'card/CreatureView';
import CardEvent from 'card/CardEvent';
import CardViewEvent from 'card/CardViewEvent';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';
import Backend from 'Backend';


/**
 * @typedef {Object} CardData
 * @property {Number} id
 * @property {Number} x
 * @property {Number} y
 * @property {Boolean} isOnField
 * @property {Boolean} isTapped
 * @property {Number} mana
 * @property {dmg} health
 * @property {Number} health
 * @property {Number} maxHealth
 * @property {Number} counter
 * @property {String} title
 * @property {String} text
 * @property {String} imageName
 * @property {String} color
 */


export default class Card extends EventEmitter {
    /**
     * @param {CardData} data
     */
    constructor(data) {
        super();


        /**
         * @type {CardData}
         * @private
         */
        this._data = data;


        /**
         * @type {CardView}
         * @protected
         */
        this._cardView = null;


        /**
         * @type {CardFullView}
         * @protected
         */
        this._cardFullView = null;


        /**
         * @type {CreatureView}
         * @protected
         */
        this._fieldView = null;


        this._createCardView(this._data);
        if (this._data.isOnField) {
            this._createFieldView();
        }
    }


    /**
     * @returns {Number}
     */
    get id() { return this._data.id; }


    /**
     * @returns {Boolean}
     */
    get isOnField() { return this._data.isOnField; }


    /**
     * @returns {Object}
     */
    get position() { return {x: this._data.x, y: this._data.y}; }


    /**
     * @param {Object} point
     */
    set position(point) {
        //TODO: WTF?!?!
        [this._data.x, this._data.y] = [point.x, point.y];

        if (this._fieldView) {
            this._fieldView.position = point;
        }
    }


    /**
     * @param {Number} value
     */
    set health(value) {
        this._data.health = value;
        this._cardView.render();

        if (this._cardFullView) {
            this._cardFullView.render();
        }
    }


    /**
     * @param {Number} value
     */
    set counter(value) {
        this._data.counter = value;
        this._cardView.render();
    }


    dispose() {
        this._cardView.dispose();

        if (this._fieldView) {
            this._fieldView.dispose();
        }

        this.emit(CardEvent.DISPOSE);
    }


    tap() {
        this._data.isTapped = true;
        this._cardView.tap();
    }


    untap() {
        this._data.isTapped = false;
        this._cardView.untap();
    }


    play(position) {
        this._createFieldView();
        this.position = position;
    }


    die() {
        this._fieldView.dispose();
        this._data.isOnField = false;
    }


    highlightOn() {
        if (this._fieldView) {
            this._fieldView.highlightOn();
        }
        this._cardView.highlightOn();
    }


    highlightOff() {
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
            CardViewEvent.RIGHT_CLICK, this._onCardViewRightClick.bind(this)
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

        this._cardView.on(
            CardViewEvent.UP_PRESS, this._onCardViewUpPress.bind(this)
        );

        this._cardView.on(
            CardViewEvent.DOWN_PRESS, this._onCardViewDownPress.bind(this)
        );

        this._cardView.on(
            CardViewEvent.LEFT_PRESS, this._onCardViewLeftPress.bind(this)
        );

        this._cardView.on(
            CardViewEvent.RIGHT_PRESS, this._onCardViewRightPress.bind(this)
        );

        this._cardView.on(
            CardViewEvent.ZOOM_IN, this._onCardViewZoomIn.bind(this)
        );

        this._cardView.on(
            CardViewEvent.ZOOM_OUT, this._onCardFullViewZoomOut.bind(this)
        );
    }

    _createCardFullView() {
        this._cardFullView = new CardFullView(this._data);
        this._cardFullView.parent = this;

        this._cardFullView.on(
            CardViewEvent.CLICK, this._onCardFullViewZoomOut.bind(this)
        );
    }

    _createFieldView() {
        var data = this._data;
        this._fieldView = new CreatureView(
            data.x, data.y, data.imageName, data.color
        );
        this._fieldView.parent = this;
        this._data.isOnField = true;

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
        this.highlightOn();
    }


    _onFieldViewOut(event) {
        this.highlightOff();
    }


    // Card view handlers
    _onCardViewClick(event) {
        this.emit(CardEvent.CARD_CLICK);
    }


    _onCardViewRightClick(event) {
        if (this._data.isTapped) {
            this.emit(CardEvent.PRESS_UNTAP);
        } else {
            this.emit(CardEvent.PRESS_TAP);
        }
    }

    _onCardViewOver(event) {
        this.highlightOn();
    }


    _onCardViewOut(event) {
        this.highlightOff();
    }


    _onCardViewCtrlClick(event) {
        this.emit(CardEvent.PLAY_AS_MANA);
    }


    _onCardViewUpPress(event) {
        Backend.addHealth(this._data.id, 1);
    }


    _onCardViewDownPress(event) {
        Backend.addHealth(this._data.id, -1);
    }


    _onCardViewLeftPress(event) {
        Backend.addCounter(this._data.id, -1);
    }


    _onCardViewRightPress(event) {
        Backend.addCounter(this._data.id, +1);
    }


    _onCardViewZoomIn(event) {
        if (!this._cardFullView) {
            this._createCardFullView();
        }
        this._cardFullView.visible = true;
    }


    _onCardFullViewZoomOut(event) {
        this._cardFullView.visible = false;
    }
}
