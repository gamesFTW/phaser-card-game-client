var BaseManager = require('field/BaseManager');
var Creature = require('field/creature/Creature');

export default class CreatureManager extends BaseManager {

    constructor(width, heigth) {
        super();

    }

    createCreature(x, y) {
        let creature = new Creature(x, y);

        return creature;
    }


}
