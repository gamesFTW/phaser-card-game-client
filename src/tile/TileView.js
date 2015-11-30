import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'FieldObjectView';


export default class TileView extends FieldObjectView {
    constructor(x, y) {
        super(x, y);

        this._sprite = PhaserWrapper.game.add.sprite(
            x * FieldObjectView.SIZE, y * FieldObjectView.SIZE, 'tile'
        );

        PhaserWrapper.addToGroup('tiles', this._sprite);

        this.addClickHandler();
    }
}
