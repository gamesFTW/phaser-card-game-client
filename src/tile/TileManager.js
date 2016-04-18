import _ from 'lodash';


import TileView from 'tile/TileView';
import EventEmitter from 'external/EventEmitter';


export default class TileManager extends EventEmitter {
    constructor(width = 14, height = 14) {
        super();


        /**
         * @type {Object}
         * @private
         */
        this._items = {};


        this.createTiles(width, height);
    }


    /**
     * @param {int} width
     * @param {int} height
     */
    createTiles(width, height) {
        var cellsToIgnore = [];

        for (var i = 0; i < width; i++) {
            this._items[i] = {};

            for (var j = 0; j < height; j++) {
                if (!_.some(cellsToIgnore, [i, j])) {
                    this._items[i][j] = this.createTile(i, j);
                }

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

        return tile;
    }
}
