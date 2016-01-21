import _ from 'lodash';
import Phaser from 'phaser';

import inputHelpers from 'lib/input';

import PhaserWrapper from 'phaserWrapper/PhaserWrapper';

import EventEmitter from 'external/EventEmitter';


import CardViewEvent from './CardViewEvent';


export default class CardView extends EventEmitter {
    static get CARD_WIDTH() {
        return 90;
    }


    static get CARD_HEIGHT() {
        return 120;
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


    /**
     * @param {Number} value
     */
    set health(value) {
        this._data.health = value;
        this.render();
    }


    constructor(data) {
        super();

        this._sprite = null;
        this._background = null;
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
            this._background.tint = '0xffcccc';
        }
    }


    highlightOff() {
        if (this._isHighlighted == true) {
            this._isHighlighted = false;
            this._background.tint = '0xffffff';
        }
    }


    _addHandlers() {
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this._onClick, this);
        this._sprite.events.onInputOver.add(this._onOver, this);
        this._sprite.events.onInputOut.add(this._onOut, this);
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

        this._background = PhaserWrapper.game.make.sprite(
            0, 0, bgImg
        );

        this._sprite.addChild(this._background);

        return this;
    }

    _addHeader() {
        var text = PhaserWrapper.game.make.text(
            8, 0,
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
            5, 20,
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
            10, CardView.CARD_HEIGHT - 23,
            this._data.dmg,
            {
                font: "18px Arial",
                align: "center",
                fill: 'black'
            }
        );

        var hp = PhaserWrapper.game.make.text(
            CardView.CARD_WIDTH - 35, CardView.CARD_HEIGHT - 23,
            this._data.health + '/' + this._data.maxHealth,
            {
                font: "18px Arial",
                align: "center",
                fill: 'black'
            }
        );
        hp.inputEnabled = true;
        hp.input.priorityID = 1;

        this._sprite.addChild(dmg);
        this._sprite.addChild(hp);

        hp.events.onInputDown.add(this._onHpClick, this);

        return this;
    }


    // Handlers
    _onClick(event, pointer) {
        var button = inputHelpers.getMouseButton(event);

        if (PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
            this.emit(CardViewEvent.CTRL_CLICK);
        } else {
            if (button == Phaser.Mouse.LEFT_BUTTON) {
                this.emit(CardViewEvent.CLICK);
            } else if (button == Phaser.Mouse.RIGHT_BUTTON) {
                this.emit(CardViewEvent.RIGHT_CLICK);
            }
        }
    }


    _onHpClick(event, pointer) {
        var button = inputHelpers.getMouseButton(event);

        if (button == Phaser.Mouse.LEFT_BUTTON) {
            this.emit(CardViewEvent.HEALTH_LEFT_CLICK);
        } else if (button == Phaser.Mouse.RIGHT_BUTTON) {
            this.emit(CardViewEvent.HEALTH_RIGHT_CLICK);
        }
    }


    _onOver(event) {
        this.emit(CardViewEvent.OVER);
    }


    _onOut(event) {
        this.emit(CardViewEvent.OUT);
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
