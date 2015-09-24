var PhaserWrapper = require('phaserWrapper/PhaserWrapper');


export default class TileView {
    constructor(x, y) {
        this.TILE_SIZE = 38;

        var tile = PhaserWrapper.game.add.isoSprite(
            x * this.TILE_SIZE, y * this.TILE_SIZE, 0, 'tile', 0
        );
        tile.anchor.set(0, 1);
        tile.smoothed = false;
    }
}
