import R from 'ramda';

import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';


import EventEmitter from 'external/EventEmitter';


export default class FieldObjectView extends EventEmitter {
    /**
     * @returns {number}
     * @const
     */
    static get SIZE() { return 30; }


    /**
     */
    get position() {
        return {x: this._x, y: this._y};
    }


    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     */
    set position(point) {
        this._x = point.x;
        this._y = point.y;

        if (this._containerSprite) {
            var newX = point.x * FieldObjectView.SIZE;
            var newY = point.y * FieldObjectView.SIZE;
            PhaserWrapper.game.add.tween(this._containerSprite).to( { x: newX, y: newY }, 500).start()

            //this._containerSprite.x = point.x * FieldObjectView.SIZE;
            //this._containerSprite.y = point.y * FieldObjectView.SIZE;
        }

        this.emit(FiledObjectsViewEvent.MOVED);
    }


    constructor(x, y) {
        super();

        this._x = null;
        this._y = null;
        this._isHighlighted = false;

        /**
         * @protected
         */
        this._containerSprite = null;


        this.position = {x: x, y: y};
    }


    dispose() {
        this._containerSprite.kill();
    }


    addHandlers() {
        this._containerSprite.inputEnabled = true;
        this._containerSprite.events.onInputDown.add(this._onClick, this);
        this._containerSprite.events.onInputOver.add(this._onOver, this);
        this._containerSprite.events.onInputOut.add(this._onOut, this);
    }


    highlightOn() {}


    highlightOff() {}


    _onClick(event, pointer) {
        if (PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
            this.emit(FiledObjectsViewEvent.CTRL_CLICK);
        } else {
            this.emit(FiledObjectsViewEvent.CLICK);
        }
    }


    _onOver(event) {
        this.emit(FiledObjectsViewEvent.OVER);
    }


    _onOut(event) {
        this.emit(FiledObjectsViewEvent.OUT);
    }


    //onDblClick() {
    //    this.emit(FiledObjectsViewEvent.DBL_CLICK);
    //}
}
