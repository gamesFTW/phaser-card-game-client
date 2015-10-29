import EventEmitter from 'external/EventEmitter';

var Creature = MeteorApp.lib.field.creature.CreatureCollection;
var Action = MeteorApp.lib.ActionCollection;


class Backend extends EventEmitter {
    get CREATURE_MOVED() { return 'Backend:creatureMoved'}


    constructor() {
        super();

        Action.find().observe({
            added: function(action) {
                this.emit(action.type, action.params);
            }.bind(this)
        });
    }


    getCreatures() {
        return Creature.find().fetch().map(function(creature) {
            return {x: creature.x, y: creature.y, id: creature._id}
        });
    }


    moveCreatureTo(id, position) {
        Meteor.call('moveCreature', id, position);
    }
}


export default new Backend();
