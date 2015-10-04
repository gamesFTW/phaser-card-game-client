var BaseManager = require('field/BaseManager');
var Creature = require('field/creature/Creature');


export default class CreatureManager extends BaseManager {
    constructor(width, heigth) {
        super();
    }


    /**
     * @param {int} x
     * @param {int} y
     * @returns {Creature}
     */
    createCreature(x, y) {
        let creature = new Creature(x, y);
        creature.parent = this;

        return creature;
    }


    /**
     * @param {Creature} creature
     * @param {object} point
     */
    moveCreatureTo(creature, point) {
        var isPointEmpty = this.checkIsEmptiness(point);

        if (isPointEmpty) {
            this.putItemTo(creature, point);
        }
    }
}
