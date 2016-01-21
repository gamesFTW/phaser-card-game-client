import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'FieldObjectView';


export default class TileView extends FieldObjectView {
    constructor(x, y) {
        super(x, y);

        /**
         * @type {boolean}
         * @private
         */
        this._isHovered = false;

        this._containerSprite = PhaserWrapper.game.add.sprite(
            x * FieldObjectView.SIZE, y * FieldObjectView.SIZE, 'tile'
        );

        PhaserWrapper.addToGroup('tiles', this._containerSprite);

        this.addHandlers();
    }


    _removeHover() {
        if (this._isHovered == true) {
            this._isHovered = false;
            var defaultColor = '0xffffff';
            this._containerSprite.tint = defaultColor;
        }
    }


    _onOver(event) {
        super._onOver(event);

        if (this._isHovered == false) {
            this._isHovered = true;
            var darker = '0xbbbbbb';
            this._containerSprite.tint = darker;
        }
    }


    _onOut(event) {
        super._onOver(event);
        this._removeHover();
    }


    _onClick(event, pointer) {
        super._onClick(event, pointer);
        this._removeHover();
    }
}
