var EventEmitter = require('external/EventEmitter');


export default class BaseManager extends EventEmitter {
    constructor() {
        super();

        this._items = {};
    }


    /**
     * @param {object} item
     * @param {object} point
     */
    putItemTo(item, point) {
        var yList = this._items[point.x];
        yList = yList ? yList : {};

        yList[point.y] = item;

        item.position = point;
    }


    checkIsEmptiness(point) {
        var yList = this._items[point.x];

        return !(yList && yList[point.y]);
    }
}
