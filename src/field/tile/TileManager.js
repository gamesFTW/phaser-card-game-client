var Tile = require('field/tile/Tile');


export default class TileManager {
    constructor(width = 2, height = 2) {
        this.createTiles(width, height);
    }


    createTiles(width, height) {
        this._items = {};

        for (var i = 0; i < width; i++) {
            this._items[i] = {};

            for (var j = 0; j < height; j++) {
                this._items[i][j] = this.createTile();
            }
        }
    }


    createTile() {
        var tile = new Tile();

        return tile;
    }
}
