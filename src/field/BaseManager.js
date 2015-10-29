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


    removeItemFrom(point) {
        if (this._items[point.x] && this._items[point.x][point.y]) {
            delete this._items[point.x][point.y];
        }
    }


    findById(id) {
        for (var x in this._items) {
            var itemsX = this._items[x];

            for (var y in itemsX) {
                var item = itemsX[y];

                if (item.id === id) {
                    return item;
                }
            }
        }
    }


    checkIsEmptiness(point) {
        var yList = this._items[point.x];

        return !(yList && yList[point.y]);
    }
}
