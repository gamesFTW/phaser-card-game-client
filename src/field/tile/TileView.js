import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import BaseFieldObjectView from 'field/BaseFieldObjectView';
import Tile from 'field/tile/Tile';


export default class TileView extends BaseFieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.sprite(
            x * Tile.SIZE, y * Tile.SIZE, 'tile'
        );

        PhaserWrapper.addToGroup('tiles', this._sprite, this);

        this.addClickHandler();
    }
}
