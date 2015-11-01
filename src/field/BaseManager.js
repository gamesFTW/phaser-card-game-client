import _ from 'lodash';


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
        let [x, y] = [point.x, point.y];

        if (this._items[x] && this._items[x][y]) {
            this._items[x][y] = null;
        } else {
            console.warn('Удаляемый item не найде в x = "%s", y = "%s"', x, y)
        }
    }


    findById(id) {
        var foundItem = null;

        _.forIn(this._items, function(itemsX, x) {
            _.forIn(itemsX, function(item, y) {
                if(item && item.id === id) {
                    foundItem = item;
                }
            });
        });

        foundItem === null && console.warn('Не нашлось item по id == "%s"', id);

        return foundItem;
    }


    isEmpty(point) {
        let [x, y] = [point.x, point.y];

        var yItems = this._items[x];

        if (!yItems) {
            return true;
        }

        return Boolean(!yItems[y]);
    }
}
