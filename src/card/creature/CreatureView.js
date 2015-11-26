import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Tile from 'card/tile/Tile';
import FieldObjectView from 'card/FieldObjectView';


export default class CretureView extends FieldObjectView {
    constructor(x, y) {
        super();

        this._sprite = PhaserWrapper.game.add.sprite(
            x * FieldObjectView.SIZE, y * FieldObjectView.SIZE, 'orc'
        );


        PhaserWrapper.addToGroup('creatures', this._sprite);

        this.addClickHandler();
    }
}
