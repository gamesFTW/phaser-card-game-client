var TileManager = require('field/tile/TileManager');
var CreatureManager = require('field/creature/CreatureManager');
var CreatureEvents = require('field/creature/CreatureEvents');
var Creature = require('field/creature/Creature');


export default class Field {
    constructor() {
        /**
         * type {TileManager}
         * @private
         */
        this._tileManager = new TileManager();

        /**
         * Creature selected by player.
         * @type {Creature}
         * @private
         */
        this._selectedCreature = null;

        /**
         * @type {CreatureManager}
         * @private
         */
        this._creatureManager = new CreatureManager();

        this._creatureManager.parent = this;
        this._creatureManager.on(
            CreatureEvents.CLICK, this.onCreatureClick.bind(this)
        );

        this._creatureManager.createCreature(0, 0);
        this._creatureManager.createCreature(0, 3);
        this._creatureManager.createCreature(1, 3);
    }


    onCreatureClick(event) {
        this._selectedCreature = event.currentTarget;
        console.log(
            'From "Field" class: selected creature =', this._selectedCreature
        );
    }
}
