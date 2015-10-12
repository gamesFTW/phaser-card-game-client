import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Tile from 'field/tile/Tile';
import BaseFieldObjectView from 'field/BaseFieldObjectView';


export default class CretureView extends BaseFieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.sprite(
            x * Tile.SIZE, y * Tile.SIZE, 'orc'
        );

        this.addClickHandler();
    }
}
