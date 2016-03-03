import PIXI from 'pixi.js';
import Phaser from 'Phaser';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import FieldObjectView from 'FieldObjectView';
import isometric from 'lib/isometric';
import filters from 'lib/filters';


export default class CreatureView extends FieldObjectView {
    constructor(x, y, imageName, color) {
        super(x, y);

        this._color = color;
        this._imageName = imageName;

        var position = isometric.pointerToIcometric({x: x, y: y});
        this._containerSprite = PhaserWrapper.game.add.sprite(
            position.x, position.y
        );

        this._creatureSprite = PhaserWrapper.game.add.sprite(
            0, 0, 'creature_' + this._imageName
        );
        this._creatureSprite.anchor.x = 0.5;
        this._creatureSprite.anchor.y = 0.5;

        var filter = new filters.OutlineFilter(PhaserWrapper.game.width, PhaserWrapper.game.height, 1, color);

        this._creatureSprite.filters = [filter];
        // Никто не знает зачем это, вроде как дает ускорение, но ломает божественный tint
        //this._creatureSprite.shader = filter;


        this._containerSprite.addChild(this._creatureSprite);

        PhaserWrapper.addToGroup('creatures', this._containerSprite);

        this.addHandlers();
    }


    highlightOn() {
        if (this._isHighlighted == false) {
            this._isHighlighted = true;
            var darker = '0xaaaaaa';
            this._creatureSprite.tint = darker;
        }
    }


    highlightOff() {
        if (this._isHighlighted == true) {
            var defaultColor = 0xffffff;
            this._isHighlighted = false;
            this._creatureSprite.tint = defaultColor;
        }
    }

}
