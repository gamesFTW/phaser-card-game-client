import Backend from 'Backend';

import TileManager from 'field/tile/TileManager';
import CreatureManager from 'field/creature/CreatureManager';

import CreatureEvent from 'field/creature/CreatureEvent';
import TileEvent from 'field/tile/TileEvent';

import Creature from 'field/creature/Creature';


export default class Field {
    constructor() {
        /**
         * type {TileManager}
         * @private
         */
        this._tileManager = new TileManager();

        /**
         * @type {CreatureManager}
         * @private
         */
        this._creatureManager = new CreatureManager();

        /**
         * Creature selected by player.
         * @type {Creature}
         */
        this._selectedCreature = null;

        this._initCreatureManager();
        this._initTileManager();
    }


    _initCreatureManager() {
        this._creatureManager.parent = this;
        this._creatureManager.on(
            CreatureEvent.CLICK, this._onCreatureClick.bind(this)
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


    _onTileClick(event) {
        var clickedTile = event.currentTarget;

        if (this._selectedCreature) {
            Backend.moveCreatureTo(
                this._selectedCreature.id, clickedTile.position
            );
        }
    }
}
