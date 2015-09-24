var TileView = require('field/tile/TileView');

export default class Tile {
    static get SIZE() { return 38; }

    constructor(x, y) {
        this._view = new TileView(x, y);
    }
}
