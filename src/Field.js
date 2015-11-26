import Backend from 'Backend';

import TileManager from 'card/tile/TileManager';
import FieldObjectManager from 'card/FieldObjectManager';

import CreatureEvent from 'card/creature/CreatureEvent';
import TileEvent from 'card/tile/TileEvent';

import Creature from 'card/creature/Creature';


export default class Field {
    constructor() {
        /**
         * type {TileManager}
         * @private
         */
        this._tileManager = new TileManager();

        /**
         * @type {FieldObjectManager}
         * @private
         */
        this._fieldObjectManager = new FieldObjectManager();

        /**
         * Creature selected by player.
         * @type {Creature}
         */
        this._selectedCreature = null;

        this._initFieldObjectManager();
        this._initTileManager();
    }


    _initFieldObjectManager() {
        this._fieldObjectManager.parent = this;

        this._fieldObjectManager.on(
            CreatureEvent.CLICK, this._onCreatureClick.bind(this)
        );

        this._fieldObjectManager.on(
            CreatureEvent.REMOVE, this._onCreatureRemoved.bind(this)
        );
    }


    _initTileManager() {
        this._tileManager.parent = this;

        this._tileManager.on(
            TileEvent.CLICK, this._onTileClick.bind(this)
        );
    }


    _onCreatureClick(event) {
        this._selectedCreature = event.currentTarget;
    }


    _onCreatureRemoved(event) {
        if (this._selectedCreature === event.currentTarget) {
            this._selectedCreature = null;
        }
    }


    _onTileClick(event) {
        var clickedTile = event.currentTarget;

        if (this._selectedCreature) {
            Backend.moveCreatureTo(this._selectedCreature.id, clickedTile.position);
        }
    }
}
