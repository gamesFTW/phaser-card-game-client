import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Tile from 'field/tile/Tile';
import BaseFieldObjectView from 'field/BaseFieldObjectView';


export default class CretureView extends BaseFieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.isoSprite(
            x * Tile.SIZE, y * Tile.SIZE, 0, 'hero', 0
        );
        this._sprite.anchor.set(0, 1);

        this.addClickHandler();
    }
}
