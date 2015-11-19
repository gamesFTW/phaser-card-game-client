import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'field/FieldObjectView';
import Tile from 'field/tile/Tile';


export default class TileView extends FieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.sprite(
            x * Tile.SIZE, y * Tile.SIZE, 'tile'
        );

        PhaserWrapper.addToGroup('tiles', this._sprite);

        this.addClickHandler();
    }
}
