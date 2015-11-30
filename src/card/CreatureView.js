import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'FieldObjectView';


export default class CreatureView extends FieldObjectView {
    constructor(x, y) {
        super(x, y);

        this._sprite = PhaserWrapper.game.add.sprite(
            x * FieldObjectView.SIZE, y * FieldObjectView.SIZE, 'orc'
        );


        PhaserWrapper.addToGroup('creatures', this._sprite);

        this.addClickHandler();
    }
}
