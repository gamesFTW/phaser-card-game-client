import CreatureView from 'card/creature/CreatureView';
import FieldObject from 'card/FieldObject';
import FiledObjectsViewEvent from 'card/FiledObjectsViewEvent';
import CreatureEvent from 'card/creature/CreatureEvent';


export default class Creature extends FieldObject {


    constructor(id, x, y) {
        super(id, x, y);

        this._view = new CreatureView(x, y);
        this._view.on(FiledObjectsViewEvent.CLICK, this.onViewClick.bind(this));
        this._view.on(FiledObjectsViewEvent.CTRL_CLICK, this.onViewCtrlClick.bind(this));
    }


    remove() {
        this.emit(CreatureEvent.REMOVE);
        this._view.remove();
    }

    onViewClick() {
        this.emit(CreatureEvent.CLICK);
    }


    onViewCtrlClick() {
        this.emit(CreatureEvent.CTRL_CLICK);
    }
}
