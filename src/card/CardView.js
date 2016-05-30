import _ from 'lodash';
import Phaser from 'phaser';


import EventEmitter from 'external/EventEmitter';


import inputHelpers from 'lib/input';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import CardViewEvent from './CardViewEvent';


export default class CardView extends EventEmitter {
    static get CARD_WIDTH() {
        return 60;
    }


    static get CARD_HEIGHT() {
        return 80;
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
        if((this._container.x == 0 && this._container.y == 0) || this.visible === false) {
            this._container.x = point.x;
            this._container.y = point.y;
        } else {
            PhaserWrapper.game.add.tween(this._container).to( { x: point.x, y: point.y }, 500).start();
        }
    }


    /**
     * @param {CardData} data
     * @param {ClientCardData} clientData
     */
    constructor(data, clientData) {
        super();

        /**
         * @type {CardData}
         * @private
         */
        this._data = data;


        /**
         * @type {boolean}
         * @private
         */
        this._isHighlighted = false;


        /**
         * @type {boolean}
         * @private
         */
        this._faceUp = true;


        this._container = PhaserWrapper.game.add.sprite();
        PhaserWrapper.addToGroup('cards', this._container);

        this._sprite = null;
        this._background = null;

        this._createSprite();
        if (data.tapped) {
            this.tap();
        }
        this._addHandlers();
    }


    render() {
        this._container.removeChild();

        this._addBg();
        if (this.faceUp) {
            this._addHeader()
                ._addMiddle()
                ._addFooter();
        }
    }


    dispose() {
        this._container.kill();
    }


    tap() {
        // 88 потому что долго считали и из ебучей анки все так плохо, надо переделать
        PhaserWrapper.game.add.tween(this._sprite).to( { x: 48, angle: 90 }, 300).start();
    }


    untap() {
        PhaserWrapper.game.add.tween(this._sprite).to( { x: 0, angle: 0 }, 300).start();
    }


    highlightOn() {
        if (this._isHighlighted == false) {
            this._isHighlighted = true;
            this._background.tint = '0xffcccc';

            // Нужно для сортировки в PhaserWrapper
            this._container.highlight = true;

            PhaserWrapper.game.input.mouse.mouseWheelCallback = this._onZoom.bind(this);
        }
    }


    highlightOff() {
        if (this._isHighlighted == true) {
            this._isHighlighted = false;
            this._background.tint = '0xffffff';

            // Нужно для сортировки в PhaserWrapper
            this._container.highlight = false;

            PhaserWrapper.game.input.mouse.mouseWheelCallback = null;
        }
    }


    _addHandlers() {
        // Keyboard input
        var upKey = PhaserWrapper.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var downKey = PhaserWrapper.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        var underscoreKey = PhaserWrapper.game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);
        var equalsKey = PhaserWrapper.game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);

        downKey.onDown.add(this._onDownKeyPress, this);
        upKey.onDown.add(this._onUpKeyPress, this);
        underscoreKey.onDown.add(this._onUnderscoreKeyPress, this);
        equalsKey.onDown.add(this._onEqualsKeyPress, this);

        // Mouse input
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this._onClick, this);
        this._sprite.events.onInputOver.add(this._onOver, this);
        this._sprite.events.onInputOut.add(this._onOut, this);
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
        let bgImg = this.faceUp ? 'card_bg' : 'card_bg_facedown';

        this._background = PhaserWrapper.game.make.sprite(
            0, 0, bgImg
        );

        this._sprite.addChild(this._background);

        return this;
    }

    _addHeader() {
        var text = PhaserWrapper.game.make.text(
            0, 12,
            this._data.title,
            {
                font: "11px Arial",
                boundsAlignH: "center",
                align: "center"
            }
        );
        text.setTextBounds(0, 0, CardView.CARD_WIDTH, 40);
        text.wordWrap = true;
        text.lineSpacing = -6;

        var mana = PhaserWrapper.game.make.text(
            6, 0,
            this._data.mana,
            {
                font: "bold 14px Arial",
                fill: "blue",
                align: "center"
            }
        );

        this._sprite.addChild(mana);
        this._sprite.addChild(text);

        return this;
    }

    _addMiddle() {
        //var text = PhaserWrapper.game.make.text(
        //    3, 20,
        //    this._data.text,
        //    {
        //        font: "9px Arial"
        //    }
        //);
        //text.wordWrap = true;
        //text.wordWrapWidth = CardView.CARD_WIDTH - 6;
        //text.lineSpacing = -8;
        //
        //this._sprite.addChild(text);

        return this;
    }

    _addFooter() {
        var dmg = PhaserWrapper.game.make.text(
            6, CardView.CARD_HEIGHT - 18,
            this._data.dmg,
            {
                font: "bold 14px Arial",
                align: "left",
                fill: 'black'
            }
        );

        //counters
        var countersQuantity = this._data.counter || 0;
        var counters = _.range(countersQuantity).map(function(n) {
            var padding = n * 5;
            return PhaserWrapper.game.make.sprite(
                padding + (CardView.CARD_WIDTH / 2) - 20, CardView.CARD_HEIGHT - 30, 'counter'
            );
        });

        var hpValue = this._data.health === this._data.maxHealth
            ? this._data.health
            : this._data.health + '/' + this._data.maxHealth;

        var hp = PhaserWrapper.game.make.text(
            CardView.CARD_WIDTH - 26, CardView.CARD_HEIGHT - 18,
            hpValue,
            {
                font: "bold 14px Arial",
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


    // Handlers
    _onClick(event, pointer) {
        if (pointer.leftButton.isDown) {
            this.emit(CardViewEvent.CLICK);
        } else if (pointer.rightButton.isDown) {
            this.emit(CardViewEvent.RIGHT_CLICK);
        } else if (pointer.middleButton.isDown) {
            this.emit(CardViewEvent.MIDDLE_CLICK);
        }
    }


    _onDownKeyPress(event) {
        if (this._isHighlighted) {
            this.emit(CardViewEvent.DOWN_PRESS);
        }
    }


    _onUnderscoreKeyPress(event) {
        if (this._isHighlighted) {
            this.emit(CardViewEvent.UNDERSCORE_PRESS);
        }
    }


    _onEqualsKeyPress(event) {
        if (this._isHighlighted) {
            this.emit(CardViewEvent.EQUALES_PRESS);
        }
    }


    _onUpKeyPress(event) {
        if (this._isHighlighted) {
            this.emit(CardViewEvent.UP_PRESS);
        }
    }


    _onOver(event) {
        if (this.faceUp) {
            this.emit(CardViewEvent.OVER);
        }
    }


    _onOut(event) {
        this.emit(CardViewEvent.OUT);
    }


    _onZoom(event) {
        if (PhaserWrapper.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
            this.emit(CardViewEvent.ZOOM_IN);
        } else {
            this.emit(CardViewEvent.ZOOM_OUT);
        }
    }
}
