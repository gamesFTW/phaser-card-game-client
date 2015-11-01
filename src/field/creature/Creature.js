import CreatureView from 'field/creature/CreatureView';
import BaseFieldObject from 'field/BaseFieldObject';
import FiledObjectsViewEvent from 'field/FiledObjectsViewEvent';
import CreatureEvent from 'field/creature/CreatureEvent';


export default class Creature extends BaseFieldObject {


    constructor(id, x, y) {
        super(id, x, y);

        this._view = new CreatureView(x, y);
        this._view.on(FiledObjectsViewEvent.CLICK, this.onViewClick.bind(this));
    }


    onViewClick() {
        this.emit(CreatureEvent.CLICK);
    }
}
