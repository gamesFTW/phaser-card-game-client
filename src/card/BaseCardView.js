import _ from 'lodash';
import Phaser from 'phaser';
import EventEmitter from 'external/EventEmitter';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


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

        this._sprite = PhaserWrapper.game.add.sprite(
            x, y, 'card_bg'
        );

        PhaserWrapper.addToGroup('cards', this._sprite);

    }



}
