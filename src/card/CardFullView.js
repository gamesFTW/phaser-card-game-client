import _ from 'lodash';
import Phaser from 'phaser';


import EventEmitter from 'external/EventEmitter';


import inputHelpers from 'lib/input';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import CardViewEvent from './CardViewEvent';


export default class CardFullView extends EventEmitter {
    static get CARD_WIDTH() {
        return 300;
    }
    
    
    static get CARD_HEIGHT() {
        return 400;
    }


    set visible (value) { this._container.visible = value; }
    get visible () { return this._container.visible; }


    get postion() {
        return { x: this._container.x, y: this._container.y };
    }

    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     */
    set position(point) {
        this._container.x = point.x;
        this._container.y = point.y;
    }


    /**
     * @param {CardData} data
     */
    constructor(data) {
        super();

        /**
         * @type {CardData}
         * @private
         */
        this._data = data;

        this._container = PhaserWrapper.game.make.sprite();
        PhaserWrapper.addToGroup('fullCards', this._container);
        this.position = { x: 600, y: 100 };

        this._sprite = null;
        this._background = null;


        this._createSprite();
        this._addHandlers();
    }


    render() {
        this._container.removeChild();

        this._addBg()
            ._addHeader()
            ._addMiddle()
            ._addFooter();
    }


    dispose() {
        this._container.kill();
    }


    _addHandlers() {
        // Mouse input
        this._sprite.inputEnabled = true;

        this._sprite.events.onInputDown.add(this._onClick, this);
    }


    _createSprite() {
        this._sprite = PhaserWrapper.game.make.sprite(
            0, 0
        );
        this._sprite.pivot.x = this._sprite.width * .5;
        this._sprite.pivot.y = this._sprite.height * .5;


        this._container.addChild(this._sprite);

        this.render();
    }


    _addBg() {
        let bgImg = 'card_bg_big';

        this._background = PhaserWrapper.game.make.sprite(
            0, 0, bgImg
        );

        this._sprite.addChild(this._background);

        return this;
    }


    _addHeader() {
        var text = PhaserWrapper.game.make.text(
            30, 5,
            this._data.title,
            {
                font: "20px Arial"
            }
        );

        var mana = PhaserWrapper.game.make.text(
            6, 2,
            this._data.mana,
            {
                font: "bold 26px Arial",
                fill: "blue",
                align: "center"
            }
        );

        this._sprite.addChild(mana);
        this._sprite.addChild(text);

        return this;
    }


    _addMiddle() {
        var text = PhaserWrapper.game.make.text(
            10, 200,
            this._data.text,
            {
                font: "14px Arial"
            }
        );
        text.wordWrap = true;
        text.wordWrapWidth = CardFullView.CARD_WIDTH - 6;
        text.lineSpacing = -7;

        this._sprite.addChild(text);

        return this;
    }


    _addFooter() {
        var dmg = PhaserWrapper.game.make.text(
            6, CardFullView.CARD_HEIGHT - 32,
            this._data.dmg,
            {
                font: "bold 26px Arial",
                align: "left",
                fill: 'black'
            }
        );

        //counters
        var countersQuantity = this._data.counter || 0;
        var counters = _.range(countersQuantity).map(function(n) {
            var padding = n * 5;
            return PhaserWrapper.game.make.sprite(
                padding + (CardFullView.CARD_WIDTH / 2) - 20, CardFullView.CARD_HEIGHT - 30, 'counter'
            );
        });

        var hpValue = this._data.health === this._data.maxHealth
            ? this._data.health
            : this._data.health + '/' + this._data.maxHealth;

        var hp = PhaserWrapper.game.make.text(
            CardFullView.CARD_WIDTH - 26, CardFullView.CARD_HEIGHT - 32,
            hpValue,
            {
                font: "bold 26px Arial",
                align: "right",
                boundsAlignH: "right",
                fill: 'black'
            }
        );
        hp.setTextBounds(0, 0, 20, 10);

        this._sprite.addChild(dmg);
        this._sprite.addChild(hp);
        counters.forEach(c => this._sprite.addChild(c), this);

        return this;
    }


    _onClick(event) {
        this.emit(CardViewEvent.CLICK);
    }
}
