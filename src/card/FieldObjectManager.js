import FieldManager from 'card/FieldManager';
import Creature from 'card/creature/Creature';
import CreatureEvent from 'card/creature/CreatureEvent';
import Backend from 'Backend';


export default class FieldObjectManager extends FieldManager {
    constructor(width, height) {
        super();

        var creatures = Backend.getCreatures();
        creatures.forEach(function(creatureData) {
            let creature = this.createCreature(creatureData);
            creature.on(CreatureEvent.CTRL_CLICK, this._onCreatureCtrlClick.bind(this))
        }.bind(this));

        Backend.on(Backend.CREATURE_MOVED, this._onCreatureMoved.bind(this));
        Backend.on(Backend.CREATURE_REMOVED, this._onCreatureRemoved.bind(this));
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


    removeCreature(creature) {
        this.removeItemFrom(creature.position);
        creature.remove();
    }


    _onCreatureCtrlClick(event) {
        Backend.removeCreature(event.currentTarget.id);
    }


    _onCreatureMoved(event) {
        var position = event.position;
        var creature = this.findById(event.id);
        this.moveCreatureTo(creature, position);
    }


    _onCreatureRemoved(event) {
        var creature = this.findById(event.id);
        this.removeCreature(creature);
    }
}
