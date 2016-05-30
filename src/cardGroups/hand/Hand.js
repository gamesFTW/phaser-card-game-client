import CardGroupManager from './../CardGroupManager';
import HandView from './HandView';


export default class Hand extends CardGroupManager {
    constructor(viewProperties) {
        super();

        this._view = new HandView(viewProperties);
        this._view.parent = this;
    }
}
