var EventEmitter = require('external/EventEmitter');

export default class BaseFieldObjectsView extends EventEmitter {
    constructor() {
        super();
    }

    static get Event() {
        return {
            CLICK: 'click'
        }
    }

    addClick() {
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this.onClick, this);
    }

    onClick() {
        this.emit(BaseFieldObjectsView.Event.CLICK);
    }

}
