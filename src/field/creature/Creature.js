var CreatureView = require('field/creature/CreatureView');
var EventEmitter = require('external/EventEmitter');
var FiledObjectsViewEvents = require('field/FiledObjectsViewEvents');
var CreatureEvents = require('field/creature/CreatureEvents');


export default class Creature extends EventEmitter {
    constructor(x, y) {
        super();

        this._view = new CreatureView(x, y);
        this._view.parent = this;

        this._view.on(FiledObjectsViewEvents.CLICK, this.onViewClick.bind(this));
    }


    onViewClick() {
        this.emit(CreatureEvents.CLICK);
    }
}
