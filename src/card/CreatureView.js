import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'FieldObjectView';


export default class CreatureView extends FieldObjectView {
    constructor(x, y, color) {
        super(x, y);

        this._color = color;

        this._sprite = PhaserWrapper.game.add.sprite(
            x * FieldObjectView.SIZE, y * FieldObjectView.SIZE, 'orc'
        );

        this._sprite.tint = color;

        PhaserWrapper.addToGroup('creatures', this._sprite);

        this.addHandlers();
    }


    highlightOn() {
        if (this._isHighlighted == false) {
            this._isHighlighted = true;
            this._sprite.tint = '0xffffff';
        }
    }


    highlightOff() {
        if (this._isHighlighted == true) {
            this._isHighlighted = false;
            this._sprite.tint = this._color;
        }
    }
}
