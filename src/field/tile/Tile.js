var TileView = require('field/tile/TileView');


export default class Tile {
    constructor(x, y) {
        this._view = new TileView(x, y);
    }
}
