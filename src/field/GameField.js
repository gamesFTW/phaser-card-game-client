var TileManager = require('field/tile/TileManager');
var CreatureManager = require('field/creature/CreatureManager');


export default class GameField {
    constructor() {
        this._tileManager = new TileManager();

        this._creatureManager = new CreatureManager();
        this._creatureManager.createCreature(0, 0);
        this._creatureManager.createCreature(0, 3);
        this._creatureManager.createCreature(1, 3);
    }
}
