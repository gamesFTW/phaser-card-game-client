var EventEmitter = require('external/EventEmitter');
var FiledObjectsViewEvents = require('field/FiledObjectsViewEvents');


export default class BaseFieldObjectsView extends EventEmitter {
    constructor() {
        super();
    }

    addClickHandler() {
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this.onClick, this);
    }

    onClick() {
        this.emit(FiledObjectsViewEvents.CLICK);
    }
}
