import _ from 'lodash';

import EventEmitter from 'external/EventEmitter';


import TileView from 'tile/TileView';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';


import { findCellsInRadius } from 'lib/map';


export default class TileManager extends EventEmitter {
    constructor(width = 14, height = 14) {
        super();


        /**
         * @type {Object}
         * @private
         */
        this._items = {};
        
        
        this._width = width;
        this._height = height;
        

        this.createTiles(width, height);
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
        tile.on(FiledObjectsViewEvent.OUT, this._onTileOut.bind(this));
    }

    
    _onTileOver(event) {
        let tile = event.currentTarget;
        let cellsToHighlight = findCellsInRadius(this._width, this._height, tile.position, 3);
        cellsToHighlight.forEach((cell) => { this._items[cell.x][cell.y].hightlight = true });
    }
    
    
    _onTileOut(event) {
        let tile = event.currentTarget;
        let cellsToHighlight = findCellsInRadius(this._width, this._height, tile.position, 3);
        cellsToHighlight.forEach((cell) => { this._items[cell.x][cell.y].hightlight = false });
    }

}
