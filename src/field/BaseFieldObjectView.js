var EventEmitter = require('external/EventEmitter');
var FiledObjectsViewEvent = require('field/FiledObjectsViewEvent');


export default class BaseFieldObjectView extends EventEmitter {
    /**
     * @type {object} value
     */
    set position(value) {
        var Tile = require('field/tile/Tile');

        this._sprite.isoX = value.x * Tile.SIZE;
        this._sprite.isoY = value.y * Tile.SIZE;
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
