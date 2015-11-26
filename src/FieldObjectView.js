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
    static get SIZE() { return 50; }


    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     */
    set position(point) {
        this._sprite.x = point.x * FieldObjectView.SIZE;
        this._sprite.y = point.y * FieldObjectView.SIZE;
        
        this.emit(FiledObjectsViewEvent.MOVED);
    }


    constructor() {
        super();

        /**
         * @protected
         */
        this._sprite = null;
    }


    remove() {
        this._sprite.kill();
    }


    addClickHandler() {
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this.onClick, this);
    }


    onClick(event, pointer) {
        if (PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
            this.emit(FiledObjectsViewEvent.CTRL_CLICK);
        } else {
            this.emit(FiledObjectsViewEvent.CLICK);
        }
    }


    //onDblClick() {
    //    this.emit(FiledObjectsViewEvent.DBL_CLICK);
    //}
}
