var CreatureView = require('field/creature/CreatureView');

export default class Creature {
    constructor(x, y) {
        this._view = new CreatureView(x, y);
        this._view.on(CreatureView.Event.CLICK, function(a) {
            console.log('aaa');
        });
    }
}
