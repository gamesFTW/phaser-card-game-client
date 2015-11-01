import EventEmitter from 'external/EventEmitter';

var Creature = MeteorApp.lib.field.creature.CreatureCollection;
var Action = MeteorApp.lib.ActionCollection;


class Backend extends EventEmitter {
    get CREATURE_MOVED() { return 'Backend:creatureMoved'}


    constructor() {
        super();
        // хак для того что бы все прошлые эвенты не пожгружались
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


    moveCreatureTo(id, position) {
        Meteor.call('moveCreature', id, position);
    }
}


export default new Backend();
