var Tile = require('field/tile/Tile');


export default class TileManager {
    constructor(width = 10, height = 10) {
        this.createTiles(width, height);
    }


    createTiles(width, height) {
        this._items = {};

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
