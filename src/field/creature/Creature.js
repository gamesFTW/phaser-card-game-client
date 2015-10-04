var CreatureView = require('field/creature/CreatureView');
var BaseFiledObject = require('field/BaseFiledObject');
var FiledObjectsViewEvent = require('field/FiledObjectsViewEvent');
var CreatureEvent = require('field/creature/CreatureEvent');


export default class Creature extends BaseFiledObject {
    constructor(x, y) {
        super(x, y);

        this._view = new CreatureView(x, y);
        this._view.on(FiledObjectsViewEvent.CLICK, this.onViewClick.bind(this));
    }


    onViewClick() {
        this.emit(CreatureEvent.CLICK);
    }
}
