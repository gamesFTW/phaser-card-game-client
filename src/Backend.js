import EventEmitter from 'external/EventEmitter';

var Creature = MeteorApp.lib.field.creature.CreatureCollection;
var Action = MeteorApp.lib.ActionCollection;


class Backend extends EventEmitter {
    get CREATURE_MOVED() { return 'Backend:creatureMoved'}
    get CREATURE_REMOVED() { return 'Backend:creatureRemoved'}


    constructor() {
        super();

        this.listenServerActions();
    }

    listenServerActions() {
        // ХАК для того что бы все прошлые эвенты не пожгружались
        var initializing = true;

        Action.find().observe({
            added: function(action) {
                if(!initializing) {
                    this.emit(action.type, action.params);
                }
            }.bind(this)
        });

        initializing = false;
    }


    getCreatures() {
        return Creature.find().fetch().map(function(creature) {
            return {x: creature.x, y: creature.y, id: creature._id}
        });
    }


    removeCreature(id) {
        Meteor.call('removeCreature', id);
    }


    moveCreatureTo(id, position) {
        Meteor.call('moveCreature', id, position);
    }
}


export default new Backend();
