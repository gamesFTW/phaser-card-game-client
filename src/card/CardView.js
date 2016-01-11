import _ from 'lodash';
import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import EventEmitter from 'external/EventEmitter';


import CardViewEvent from './CardViewEvent';


export default class CardView extends EventEmitter {
    static get CARD_WIDTH() {
        return 150;
    }


    static get CARD_HEIGHT() {
        return 200;
    }


    set faceUp (value) {
        let oldState = this._faceUp;
        this._faceUp = value;

        if (value !== oldState) {
            // TODO events
            this.render();
        }
    }
    get faceUp () { return this._faceUp; }


    set visible (value) { this._sprite.visible = value; }
    get visible () { return this._sprite.visible; }


    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     */
    set position(point) {
        this._sprite.x = point.x;
        this._sprite.y = point.y;
    }


    constructor(data) {
        super();

        this._sprite = null;
        this._data = data;
        this._isHighlighted = false;

        this._faceUp = true;

        this._createContainerSprite();
        if (data.isTapped) {
            this.tap();
        }
        this._addHandlers();
    }


    render() {
        this._sprite.removeChild();

        this._addBg();
        if (this.faceUp) {
            this._addHeader()
                ._addMiddle()
                ._addFooter();
        }
    }


    dispose() {
        this._sprite.kill();
    }


    enableDragAndDrop() {
        this._sprite.inputEnabled = true;
        this._sprite.input.enableDrag();
        this._sprite.events.onDragStart.add(this._onDragStart, this);
        this._sprite.events.onDragStop.add(this._onDragStop, this);
        //this._sprite.events.onDragUpdate.add(this._onDragUpdate, this);
    }


    tap() {
        this._sprite.angle = 90;
    }


    untap() {
        this._sprite.angle = 0;
    }


    highlightOn() {
        if (this._isHighlighted == false) {
            this._isHighlighted = true;
            this._sprite.width = this._sprite.width * 1.05;
            this._sprite.height = this._sprite.height * 1.05;
        }
    }


    highlightOff() {
        if (this._isHighlighted == true) {
            this._isHighlighted = false;
            this._sprite.width = this._sprite.width / 1.05;
            this._sprite.height = this._sprite.height / 1.05;
        }
    }


    _addHandlers() {
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this._onClick, this);
        this._sprite.events.onInputOver.add(this._onOver, this);
        this._sprite.events.onInputOut.add(this._onOut, this);
    }


    _onClick(event, pointer) {
        if (PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
            this.emit(CardViewEvent.CTRL_CLICK);
        } else {
            this.emit(CardViewEvent.CLICK);
        }
    }


    _onOver(event) {
        this.emit(CardViewEvent.OVER);
    }


    _onOut(event) {
        this.emit(CardViewEvent.OUT);
    }


    _createContainerSprite() {
        this._sprite = PhaserWrapper.game.make.sprite(
            0, 0
        );
        this._sprite.pivot.x = this._sprite.width * .5;
        this._sprite.pivot.y = this._sprite.height * .5;

        PhaserWrapper.addToGroup('cards', this._sprite);

        this.render();
    }


    _addBg() {
        let bgImg = this.faceUp ? 'card_bg' : 'card_bg_facedown';

        let bg = PhaserWrapper.game.make.sprite(
            0, 0, bgImg
        );

        this._sprite.addChild(bg);

        return this;
    }

    _addHeader() {
        var text = PhaserWrapper.game.make.text(
            5, 5,
            this._data.title,
            {
                font: "12px Arial",
                align: "center"
            }
        );

        this._sprite.addChild(text);

        return this;
    }

    _addMiddle() {
        var text= PhaserWrapper.game.make.text(
            5, CardView.CARD_HEIGHT / 2,
            this._data.text,
            {
                font: "10px Arial",
                align: "center",
                fontStyle: "italic"
            }
        );

        this._sprite.addChild(text);

        return this;
    }

    _addFooter() {
        var dmg = PhaserWrapper.game.make.text(
            25, CardView.CARD_HEIGHT - 25,
            this._data.dmg,
            {
                font: "18px Arial",
                align: "center",
                fill: 'black'
            }
        );

        var hp = PhaserWrapper.game.make.text(
            CardView.CARD_WIDTH - 25, CardView.CARD_HEIGHT - 25,
            this._data.health,
            {
                font: "18px Arial",
                align: "center",
                fill: 'red'
            }
        );

        this._sprite.addChild(dmg);
        this._sprite.addChild(hp);

        return this;
    }


    _onDragStart() {
        this.emit(CardViewEvent.START_DRAG);
    }


    _onDragStop() {
        this.emit(CardViewEvent.STOP_DRAG);
    }


    _onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {

    }
}
