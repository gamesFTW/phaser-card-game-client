import EventEmitter from 'external/EventEmitter';
import FiledObjectsViewEvent from 'field/FiledObjectsViewEvent';
import Tile from 'field/tile/Tile';


export default class BaseFieldObjectView extends EventEmitter {
    /**
     * @type {object} value
     */
    set position(value) {
        this._sprite.x = value.x * Tile.SIZE;
        this._sprite.y = value.y * Tile.SIZE;
    }


    constructor() {
        super();

        /**
         * @type {Phaser.Plugin.Isometric.IsoSprite}
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
