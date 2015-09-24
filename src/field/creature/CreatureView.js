var PhaserWrapper = require('phaserWrapper/PhaserWrapper');
var Tile = require('field/tile/Tile');

export default class CretureView {

    constructor(x, y) {

        var heroSprite = PhaserWrapper.game.add.isoSprite(x * Tile.SIZE, y * Tile.SIZE, 0, 'hero', 0);
        heroSprite.anchor.set(0, 1);
    }
}
