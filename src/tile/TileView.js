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

        var size = FieldObjectView.SIZE;

        this._containerSprite = PhaserWrapper.game.add.sprite(
            x * size, y * size,
            'field_bg', 's' + x + '_' + y
        );

        var lines = PhaserWrapper.game.make.sprite(
            0, 0,
            'lines'
        );

        this._containerSprite.addChild(lines);

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
