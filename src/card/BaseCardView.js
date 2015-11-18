import _ from 'lodash';
import Phaser from 'phaser';
import EventEmitter from 'external/EventEmitter';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import CardEvent from './CardEvent';


export default class BaseCardView extends EventEmitter {
    static get CARD_WIDTH() {
        return 150;
    }


    static get CARD_HEIGHT() {
        return 200;
    }


    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     */
    set position(point) {
        this._sprite.x = point.x;
        this._sprite.y = point.y;

        //this.emit();
    }


    constructor(x, y, data) {
        super();

        this._data = data;
        this._sprite = null;

        this.createView(x, y);
    }


    createView(x, y) {
        this._sprite = PhaserWrapper.game.add.sprite(
            x, y, 'card_bg'
        );

        this.addHeader()
            .addMiddle()
            .addFooter();

        PhaserWrapper.addToGroup('cards', this._sprite);
    }


    enableDragAndDrop() {
        this._sprite.inputEnabled = true;
        this._sprite.input.enableDrag();
        this._sprite.events.onDragStart.add(this._onDragStart, this);
        this._sprite.events.onDragStop.add(this._onDragStop, this);
        //this._sprite.events.onDragUpdate.add(this._onDragUpdate, this);
    }


    addHeader() {
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

    addMiddle() {
        var text= PhaserWrapper.game.make.text(
            5, BaseCardView.CARD_HEIGHT / 2,
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

    addFooter() {
        var dmg = PhaserWrapper.game.make.text(
            25, BaseCardView.CARD_HEIGHT - 25,
            this._data.dmg,
            {
                font: "18px Arial",
                align: "center",
                fill: 'black'
            }
        );

        var hp = PhaserWrapper.game.make.text(
            BaseCardView.CARD_WIDTH - 25, BaseCardView.CARD_HEIGHT - 25,
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
        this.emit(CardEvent.START_DRAG);
        console.log(arguments);
    }


    _onDragStop() {
        console.log('stop', arguments);
        this.emit(CardEvent.STOP_DRAG);
    }


    _onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {

    }
}
