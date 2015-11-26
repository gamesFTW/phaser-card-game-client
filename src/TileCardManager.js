import Backend from 'Backend';

import TileManager from 'tile/TileManager';
import FieldObjectManager from 'card/CardManager';

import CreatureEvent from 'card/creature/CreatureEvent';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';

import Creature from 'card/creature/Creature';


export default class TileCardManager {
    constructor(tileManager, cardManager) {
        /**
         * type {TileManager}
         * @private
         */
        this._tileManager = tileManager;


        /**
         * type {CardManager}
         * @private
         */
        this._cardManager = cardManager;

        /**
         * Creature selected by player.
         * @type {Creature}
         */
        this._selectedCreature = null;

        this._initFieldObjectManager();
        this._initTileManager();
    }


    _initFieldObjectManager() {
        this._cardManager.parent = this;

        this._cardManager.on(
            CreatureEvent.CLICK, this._onCreatureClick.bind(this)
        );

        this._cardManager.on(
            CreatureEvent.REMOVE, this._onCreatureRemoved.bind(this)
        );
    }


    _initTileManager() {
        this._tileManager.parent = this;

        this._tileManager.on(
            FiledObjectsViewEvent.CLICK, this._onTileClick.bind(this)
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
            Backend.moveCreatureTo(
                this._selectedCreature.id, clickedTile.position);
        }
    }
}
