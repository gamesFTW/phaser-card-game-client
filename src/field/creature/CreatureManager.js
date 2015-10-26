import BaseManager from 'field/BaseManager';
import Creature from 'field/creature/Creature';
import Backend from 'Backend';


export default class CreatureManager extends BaseManager {
    constructor(width, heigth) {
        super();

        var creatures = Backend.getCreatures();
        creatures.forEach(function(creature) {
            this.createCreature(creature);
        }.bind(this));

        Backend.creatureObserve(function(newCreature, oldCreature) {
            var creature = this._items[oldCreature.x][oldCreature.y];
            this._items[oldCreature.x][oldCreature.y] = null;
            this.moveCreatureTo(creature, {x: newCreature.x, y: newCreature.y});
        }.bind(this));
    }


    /**
     * @returns {Creature}
     */
    createCreature(creatureParams) {
        let creature = new Creature(
            creatureParams.id,
            creatureParams.x,
            creatureParams.y
        );
        creature.parent = this;

        this.putItemTo(creature, {x: creatureParams.x, y: creatureParams.y});

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
