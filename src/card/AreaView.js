import PIXI from 'pixi.js';
import Phaser from 'Phaser';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import FieldObjectView from 'FieldObjectView';
import isometric from 'lib/isometric';
import filters from 'lib/filters';


export default class AreaView extends FieldObjectView {
    constructor(x, y, imageName, color) {
        super(x, y);

        this._color = color;
        this._imageName = imageName;

        var position = isometric.pointerToIcometric({x: x, y: y});
        this._containerSprite = PhaserWrapper.game.add.sprite(
            position.x, position.y
        );

        this._areaSprite = PhaserWrapper.game.add.sprite(
            -30, -45, this._imageName
        );
        //this._areaSprite.anchor.x = 0.5;
        //this._areaSprite.anchor.y = 0.5;

        var filter = new filters.OutlineFilter(PhaserWrapper.game.width, PhaserWrapper.game.height, 1, color);

        this._areaSprite.filters = [filter];
        // Никто не знает зачем это, вроде как дает ускорение, но ломает божественный tint
        //this._areaSprite.shader = filter;


        this._containerSprite.addChild(this._areaSprite);

        PhaserWrapper.addToGroup('areas', this._containerSprite);

        this.addHandlers();
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

}

