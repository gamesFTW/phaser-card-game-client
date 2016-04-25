import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'FieldObjectView';
import TileEvent from './TileEvent';

import isometric from 'lib/isometric';


export default class TileView extends FieldObjectView {
    
    set hightlight(value) {
        this._isHightlighted = value;
        
        if (value) {
            this._addHighlight();
        } else {
            this._removeHighlight();
        }
    }
    
    set hover(value) {
        this._isHovered = value;
         
        if (value) {
            this._addHover();
        } else {
            this._removeHover();
        }
    }
    
    constructor(data) {
        super(data);

        /**
         * @type {boolean}
         * @private
         */
        this._isHovered = false;
        
        this._isHightlighted = false;

        var position = isometric.pointerToIcometric({x: data.x, y: data.y});
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
    
    
    _addHighlight() {
        var darker = '0xbbbbbb';
        this._containerSprite.tint = darker;
    }
    
    
    _removeHighlight() {
        var defaultColor = '0xffffff';
        this._containerSprite.tint = defaultColor;
    }


    _removeHover() {
        var defaultColor = '0xffffff';
        this._containerSprite.tint = defaultColor;
    }
    
    
    _addHover() {
        var darker = '0xbbbbbb';
        this._containerSprite.tint = darker;
    }


    _onOver(event) {
        super._onOver(event);
        this.hover = true;
    }


    _onOut(event) {
        super._onOut(event);
        this.hover = false;
    }


    _onClick(event, pointer) {
        super._onClick(event, pointer);
        this.hover = false;
    }
}
