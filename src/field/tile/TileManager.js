import Tile from 'field/tile/Tile';
import FieldManager from 'field/FieldManager';


export default class TileManager extends FieldManager {
    constructor(width = 10, height = 10) {
        super();

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
     * @returns {Tile}
     */
    createTile(x, y) {
        var tile = new Tile(x, y);
        tile.parent = this;

        return tile;
    }
}
