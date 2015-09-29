var EventEmitter = require('external/EventEmitter');


export default class BaseManager extends EventEmitter {
    constructor() {
        super();

        this._items = {};
    }
}
