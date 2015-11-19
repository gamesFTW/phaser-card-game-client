/**
 * @FileOverview
 *
 *
 */


import EventEmitter from 'external/EventEmitter';


import HandView from './Hand/HandView';


export default class CardManager extends EventEmitter {
    constructor() {
        super();

        this.handView = new HandView();
        this.handView.parent = this;

    }


}
