import R from 'ramda';

import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FiledObjectsViewEvent from 'field/FiledObjectsViewEvent';
import Tile from 'field/tile/Tile';


import EventEmitter from 'external/EventEmitter';


export default class BaseFieldObjectView extends EventEmitter {
    /**
     * @param {Object} point
     */
    set position(point) {
        this._sprite.x = point.x * Tile.SIZE;
        this._sprite.y = point.y * Tile.SIZE;
        
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
