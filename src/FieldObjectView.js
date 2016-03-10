import R from 'ramda';

import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';


import EventEmitter from 'external/EventEmitter';
import isometric from 'lib/isometric';


export default class FieldObjectView extends EventEmitter {
    /**
     */
    get position() {
        return {x: this._data.x, y: this._data.y};
    }


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


        this._isHighlighted = false;

        /**
         * @protected
         */
        this._containerSprite = null;
    }


    /**
     */
    renderPosition() {
        if (this._containerSprite) {
            var position = isometric.pointerToIcometric(
                {x: this._data.x, y: this._data.y}
            );

            var newX = position.x;
            var newY = position.y;
            PhaserWrapper.game.add.tween(this._containerSprite)
                .to( { x: newX, y: newY }, 500)
                .start();
        }

        this.emit(FiledObjectsViewEvent.MOVED);
    }


    renderRotate() {
        if (this._data.rotated) {
            this._containerSprite.scale.x = -1;
        } else {
            this._containerSprite.scale.x = 1;
        }
    }


    dispose() {
        this._containerSprite.kill();
    }


    addHandlers() {
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
}
