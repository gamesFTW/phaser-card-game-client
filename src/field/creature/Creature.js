var CreatureView = require('field/creature/CreatureView');

export default class Creature {
    constructor(x, y) {
        this._view = new CreatureView(x, y);
    }

}
