import CardGroupManager from './../CardGroupManager';
import HandView from './HandView';


export default class Hand extends CardGroupManager {

    constructor() {
        super();

        this._view = new HandView();
        this._view.parent = this;

    }
}
