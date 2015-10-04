import CreatureView from 'field/creature/CreatureView';
import BaseFiledObject from 'field/BaseFiledObject';
import FiledObjectsViewEvent from 'field/FiledObjectsViewEvent';
import CreatureEvent from 'field/creature/CreatureEvent';


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
