import PIXI from 'pixi.js';
import Phaser from 'Phaser';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import FieldObjectView from 'FieldObjectView';
import isometric from 'lib/isometric';
import filters from 'lib/filters';

var Color = {
    '1': '0xff8888',
    '2': '0x8888ff',
    '3': '0x88ffff',
    '4': '0xffff88'
};

export default class CreatureView extends FieldObjectView {
    constructor(data) {
        super(data);

        var position = isometric.pointerToIcometric({x: data.x, y: data.y});
        this._containerSprite = PhaserWrapper.game.add.sprite(
            position.x, position.y
        );

        this._creatureSprite = PhaserWrapper.game.add.sprite(
            data.big ? 50 : 0, 0, data.imageId
        );
        this._creatureSprite.anchor.x = 0.5;
        this._creatureSprite.anchor.y = 0.5;

        var filter = new filters.OutlineFilter(
            PhaserWrapper.game.width, PhaserWrapper.game.height, 1.5, Color[data.color]
        );

        this._creatureSprite.filters = [filter];

        // Никто не знает зачем это, вроде как дает ускорение, но ломает божественный tint
        //this._creatureSprite.shader = filter;


        this._containerSprite.addChild(this._creatureSprite);

        PhaserWrapper.addToGroup('creatures', this._containerSprite);

        this.addHandlers();
        this.renderPosition();
        this.renderRotate();
    }


    makeSomeBlood() {
        let position = isometric.pointerToIcometric(this.position);

        PhaserWrapper.bloodEmitter.x = position.x;
        PhaserWrapper.bloodEmitter.y = position.y - 50;

        PhaserWrapper.bloodEmitter.start(true, 700, null, 100);
    }


    makeSomeHeal() {
        let position = isometric.pointerToIcometric(this.position);

        PhaserWrapper.healEmitter.x = position.x;
        PhaserWrapper.healEmitter.y = position.y - 20;

        PhaserWrapper.healEmitter.start(true, 700, null, 100);
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
    
    renderRotate() {
        if (this._data.rotated) {
            this._creatureSprite.scale.x = -1;
        } else {
            this._creatureSprite.scale.x = 1;
        }
    }

}
