var PhaserWrapper = require('phaserWrapper/PhaserWrapper');

export default class TileView {
    constructor(x, y) {
        var Tile = require('field/tile/Tile');

        var tile = PhaserWrapper.game.add.isoSprite(
            x * Tile.SIZE, y * Tile.SIZE, 0, 'tile', 0
        );
        tile.anchor.set(0, 1);
        tile.smoothed = false;
    }
}
