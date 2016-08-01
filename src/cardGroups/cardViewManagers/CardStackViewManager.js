import _ from 'lodash';


import CardViewManager from './CardViewManager';
import GlobalEvent from 'GlobalEvent';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Phaser from 'phaser';


export default class CardStackViewManager extends CardViewManager {
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Number} scale - не работает
     */
    constructor({x: x, y: y, faceUp: faceUp, scale: scale = 1}) {
        super(...arguments);


        var escKey = PhaserWrapper.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escKey.onDown.add(this._onEscKeyPress, this);
    }


    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        var cardsViews = cards.map(card => card.cardView);

        var firstCardView = _.first(cardsViews);
        if (firstCardView) {
            firstCardView.visible = true;
            this.placeCard(firstCardView, this._x, this._y);
        }

        _.rest(cardsViews).forEach(cv => cv.visible = false);
    }


    _onEscKeyPress(event) {
        this.emit(GlobalEvent.ESC_PRESSED);
    }
}
