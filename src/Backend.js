var Creature = MeteorApp.lib.field.creature.CreatureCollection;


export default class Backend {
    static getCreatures() {
        return Creature.find().fetch().map(function(creature) {
            return {x: creature.x, y: creature.y, id: creature._id}
        });
    }


    static moveCreatureTo(id, position) {
        var creature = Creature.findOne({_id: id});
        creature.x = position.x;
        creature.y = position.y;

        Creature.update(id, creature);
    }


    static creatureObserve(func) {
        Creature.find().observe({
            changed: func
        });
    }
}
