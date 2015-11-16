/**
 * @FileOverview
 * Главный класс отвечающий за все вьюшки зон карт(наследуются от BaseCardViewManager).
 *
 *
 */


import EventEmitter from 'external/EventEmitter';


import HandView from './HandView';


export default class CardManager extends EventEmitter {
    constructor() {
        super();

        this.handView = new HandView();
        this.handView.parent = this;

    }


}
