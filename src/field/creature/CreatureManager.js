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

        Backend.on(Backend.CREATURE_MOVED, this._onCreatureMoved.bind(this));
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
        var isPointEmpty = this.isEmpty(point);

        if (isPointEmpty) {
            var oldPointPosition = creature.position;
            this.putItemTo(creature, point);
            this.removeItemFrom(oldPointPosition);
        }
    }


    _onCreatureMoved(event) {
        var position = event.position;
        var creature = this.findById(event.id);
        this.moveCreatureTo(creature, position);
    }
}
