import EventEmitter from 'external/EventEmitter';


export default class BaseManager extends EventEmitter {
    constructor() {
        super();

        this._items = {};
    }


    /**
     * @param {BaseFieldObject} item
     * @param {object} point
     */
    putItemTo(item, point) {
        this._items[point.x] = this._items[point.x] ? this._items[point.x] : {};
        this._items[point.x][point.y] = item;

        item.position = point;
    }


    checkIsEmptiness(point) {
        var yList = this._items[point.x];

        return !(yList && yList[point.y]);
    }
}
