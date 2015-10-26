import TileView from 'field/tile/TileView';
import BaseFieldObject from 'field/BaseFieldObject';
import TileEvent from 'field/tile/TileEvent';
import FiledObjectsViewEvent from 'field/FiledObjectsViewEvent';


export default class Tile extends BaseFieldObject {
    /**
     * @returns {number}
     * @const
     */
    static get SIZE() { return 50; }


    constructor(x, y) {
        super(x, y);

        this._view = new TileView(x, y);
        this._view.on(FiledObjectsViewEvent.CLICK, this.onViewClick.bind(this));
    }


    onViewClick() {
        this.emit(TileEvent.CLICK);
    }
}
