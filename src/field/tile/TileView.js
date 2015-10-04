import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import BaseFieldObjectView from 'field/BaseFieldObjectView';
import Tile from 'field/tile/Tile';


export default class TileView extends BaseFieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.isoSprite(
            x * Tile.SIZE, y * Tile.SIZE, 0, 'tile', 0
        );
        this._sprite.anchor.set(0, 1);
        this._sprite.smoothed = true;

        this.addClickHandler();
    }
}
