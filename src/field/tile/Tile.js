var TileView = require('field/tile/TileView');
var BaseFiledObject = require('field/BaseFiledObject');
var TileEvent = require('field/tile/TileEvent');
var FiledObjectsViewEvent = require('field/FiledObjectsViewEvent');


export default class Tile extends BaseFiledObject {
    /**
     * @returns {number}
     * @const
     */
    static get SIZE() { return 38; }


    constructor(x, y) {
        super(x, y);

        this._view = new TileView(x, y);
        this._view.on(FiledObjectsViewEvent.CLICK, this.onViewClick.bind(this));
    }


    onViewClick() {
        this.emit(TileEvent.CLICK);
    }
}
