import PIXI from 'pixi.js';
import Phaser from 'Phaser';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import FieldObjectView from 'FieldObjectView';
import isometric from 'lib/isometric';
import filters from 'lib/filters';


export default class AreaView extends FieldObjectView {
    constructor(data) {
        super(data);

        var position = isometric.pointerToIcometric({x: data.x, y: data.y});
        this._containerSprite = PhaserWrapper.game.add.sprite(
            position.x, position.y
        );

        this._areaSprite = PhaserWrapper.game.add.sprite(
            -30, -45, data.imageId
        );

        var filter = new filters.OutlineFilter(
            PhaserWrapper.game.width, PhaserWrapper.game.height, 1, data.color
        );

        this._areaSprite.filters = [filter];
        // Никто не знает зачем это, вроде как дает ускорение, но ломает божественный tint
        //this._areaSprite.shader = filter;

        this._containerSprite.addChild(this._areaSprite);

        PhaserWrapper.addToGroup('areas', this._containerSprite);

        this.addHandlers();
        this.renderPosition();
        this.renderRotate();
    }


    highlightOn() {
        if (this._isHighlighted == false) {
            this._isHighlighted = true;
            var darker = '0xaaaaaa';
            this._areaSprite.tint = darker;
        }
    }


    highlightOff() {
        if (this._isHighlighted == true) {
            var defaultColor = 0xffffff;
            this._isHighlighted = false;
            this._areaSprite.tint = defaultColor;
        }
    }
    
    renderRotate() {
        if (this._data.rotated) {
            this._containerSprite.scale.x = -1;
        } else {
            this._containerSprite.scale.x = 1;
        }
    }

}

