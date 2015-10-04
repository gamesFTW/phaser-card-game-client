var PhaserWrapper = require('phaserWrapper/PhaserWrapper');
var BaseFieldObjectView = require('field/BaseFieldObjectView');


export default class TileView extends BaseFieldObjectView {
    constructor(x, y) {
        super();
        var Tile = require('field/tile/Tile');

        this._sprite = PhaserWrapper.game.add.isoSprite(
            x * Tile.SIZE, y * Tile.SIZE, 0, 'tile', 0
        );
        this._sprite.anchor.set(0, 1);
        this._sprite.smoothed = true;

        this.addClickHandler();
    }
}
