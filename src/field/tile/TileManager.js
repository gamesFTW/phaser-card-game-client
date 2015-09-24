var Tile = require('field/tile/Tile');
var BaseManager = require('field/BaseManager');

export default class TileManager extends BaseManager {
    constructor(width = 10, height = 10) {
        super();

        this.createTiles(width, height);
    }


    createTiles(width, height) {

        for (var i = 0; i < width; i++) {
            this._items[i] = {};

            for (var j = 0; j < height; j++) {
                this._items[i][j] = this.createTile(i, j);
            }
        }
    }


    createTile(x, y) {
        var tile = new Tile(x, y);

        return tile;
    }
}
