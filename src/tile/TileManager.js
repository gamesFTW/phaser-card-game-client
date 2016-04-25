import _ from 'lodash';

import EventEmitter from 'external/EventEmitter';


import TileView from 'tile/TileView';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';


import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import Phaser from 'phaser';


import { findCellsInRadius } from 'lib/map';


export default class TileManager extends EventEmitter {
    constructor(width = 14, height = 14) {
        super();


        /**
         * @type {Object}
         * @private
         */
        this._items = {};


        /**
         * @type {TileView}
         * @private
         */
        this._currentHoveredTile = null;
        
        
        this._width = width;
        this._height = height;
        

        this.createTiles(width, height);

        for (var i = 1; i <= 9; i++) {
            var keyCode = String(i).charCodeAt(0);
            var phaserKey = PhaserWrapper.game.input.keyboard.addKey(keyCode);
            phaserKey.onDown.add(_.partialRight(this._onNumberKeyDown, i), this);
            phaserKey.onUp.add(_.partialRight(this._onNumberKeyUp, i), this);
        }
    }


    /**
     * @param {int} width
     * @param {int} height
     */
    createTiles(width, height) {
        for (var i = 0; i < width; i++) {
            this._items[i] = {};

            for (var j = 0; j < height; j++) {
                this._items[i][j] = this.createTile(i, j);
            }
        }
    }


    /**
     * @param {int} x
     * @param {int} y
     * @returns {TileView}
     */
    createTile(x, y) {
        var tile = new TileView({x: x, y: y});
        tile.parent = this;

        this.addHandlers(tile);

        return tile;
    }


    addHandlers(tile) {
        tile.on(FiledObjectsViewEvent.OVER, this._onTileOver.bind(this));
    }


    /**
     * @param {Booelan} highlight
     * @private
     */
    _setTilesHighlight(highlight) {
        let tile = this._currentHoveredTile;
        let radius = this._highlitedRadius;

        if (tile && radius) {
            let cellsToHighlight = findCellsInRadius(
                this._width, this._height, tile.position, radius
            );
            cellsToHighlight.forEach((cell) => {
                this._items[cell.x][cell.y].hightlight = highlight
            });
        }
    }


    /**
     * @param {Object} event
     * @param {Booelan} keyValue
     * @private
     */
    _onNumberKeyDown(event, keyValue) {
        this._highlitedRadius = keyValue;

        this._setTilesHighlight(true);
    }


    /**
     * @param {Object} event
     * @param {Booelan} keyValue
     * @private
     */
    _onNumberKeyUp(event, keyValue) {
        this._highlitedRadius = keyValue;

        this._setTilesHighlight(false);

        this._highlitedRadius = null;
    }


    /**
     * @param {Object} event
     * @private
     */
    _onTileOver(event) {
        this._setTilesHighlight(false);
        this._currentHoveredTile = event.currentTarget;
        this._setTilesHighlight(true);
    }
}
