import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'FieldObjectView';
import isometric from 'lib/isometric';


export default class TileView extends FieldObjectView {
    constructor(x, y) {
        super(x, y);

        /**
         * @type {boolean}
         * @private
         */
        this._isHovered = false;

        var position = isometric.pointerToIcometric({x: x, y: y});
        this._containerSprite = PhaserWrapper.game.add.sprite(
            position.x, position.y, 'isometric-tile'
        );

        this._containerSprite.inputEnabled = true;
        this._containerSprite.input.pixelPerfectOver = true;
        this._containerSprite.input.pixelPerfectClick = true;

        this._containerSprite.anchor.x = 0.5;
        this._containerSprite.anchor.y = 0.5;

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
        super._onOut(event);
        this._removeHover();
    }


    _onClick(event, pointer) {
        super._onClick(event, pointer);
        this._removeHover();
    }
}
