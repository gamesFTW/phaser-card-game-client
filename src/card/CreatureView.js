import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FieldObjectView from 'FieldObjectView';
import Phaser from 'Phaser';


export default class CreatureView extends FieldObjectView {
    constructor(x, y, imageName, color) {
        super(x, y);

        this._color = color;
        this._imageName = imageName;

        this._containerSprite = PhaserWrapper.game.add.sprite(
            x * FieldObjectView.SIZE,
            y * FieldObjectView.SIZE
        );

        this._creatureSprite = PhaserWrapper.game.add.sprite(
            -9, -20, this._imageName
        );
        this._creatureSprite.tint = color;
        //this._creatureShadow = this._createCreatureShadow(color);


        //this._containerSprite.addChild(this._creatureShadow);
        this._containerSprite.addChild(this._creatureSprite);

        PhaserWrapper.addToGroup('creatures', this._containerSprite);

        this.addHandlers();
    }


    highlightOn() {
        if (this._isHighlighted == false) {
            this._isHighlighted = true;
            var darker = '0xdddddd';
            this._creatureSprite.tint = darker;
        }
    }


    highlightOff() {
        if (this._isHighlighted == true) {
            this._isHighlighted = false;
            this._creatureSprite.tint = this._color;
        }
    }


    _createCreatureShadow(color) {
        var modifier = 0.08;
        var creatureShadow = PhaserWrapper.game.add.sprite(
            -(this._creatureSprite.width * modifier) - 9,
            -(this._creatureSprite.height * modifier) - 20,
            this._imageName
        );
        creatureShadow.width = creatureShadow.width * (modifier * 2 + 1);
        creatureShadow.height = creatureShadow.height * (modifier * 2 + 1);
        //creatureShadow.tint = color;

        return creatureShadow;
    }
}
