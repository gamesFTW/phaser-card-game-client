import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'card/FieldObjectView';
import Tile from 'card/tile/Tile';


export default class TileView extends FieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.sprite(
            x * FieldObjectView.SIZE, y * FieldObjectView.SIZE, 'tile'
        );

        PhaserWrapper.addToGroup('tiles', this._sprite);

        this.addClickHandler();
    }
}
