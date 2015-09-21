var PhaserWrapper = require('phaserWrapper/PhaserWrapper');


export default class TileView {
    constructor() {
        var tile = PhaserWrapper.game.add.isoSprite(3, 3, 0, 'tile', 0);
        tile.anchor.set(0, 1);
        tile.smoothed = false;
    }
}
