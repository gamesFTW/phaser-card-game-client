import TileView from 'tile/TileView';
import EventEmitter from 'external/EventEmitter';


export default class TileManager extends EventEmitter {
    constructor(width = 24, height = 24) {
        super();


        /**
         * @type {Object}
         * @private
         */
        this._items = {};


        this.createTiles(width, height);
    }


    /**
     * @param {int} width
     * @param {int} height
     */
    createTiles(width, height) {
        for (var i = 0; i < width; i++) {
            this._items[i] = {};

            for (var j = 0; j < height; j++) {
                this._items[i][j] = this.createTile(i, j);
            }
        }
    }


    /**
     * @param {int} x
     * @param {int} y
     * @returns {TileView}
     */
    createTile(x, y) {
        var tile = new TileView(x, y);
        tile.parent = this;

        return tile;
    }
}
