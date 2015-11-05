import EventEmitter from 'external/EventEmitter';

import FiledObjectsViewEvent from 'field/FiledObjectsViewEvent';


import Tile from 'field/tile/Tile';


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


    addClickHandler() {
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this.onClick, this);
    }


    onClick() {
        this.emit(FiledObjectsViewEvent.CLICK);
    }
}
