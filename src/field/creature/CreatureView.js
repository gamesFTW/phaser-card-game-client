import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Tile from 'field/tile/Tile';
import FieldObjectView from 'field/FieldObjectView';


export default class CretureView extends FieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.sprite(
            x * Tile.SIZE, y * Tile.SIZE, 'orc'
        );


        PhaserWrapper.addToGroup('creatures', this._sprite);

        this.addClickHandler();
    }
}
