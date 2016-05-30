import CardGroupManager from './../CardGroupManager';
import ManaPoolView from './ManaPoolView';


export default class ManaPool extends CardGroupManager {
    constructor(viewProperties) {
        super();


        this._view = new ManaPoolView(viewProperties);
        this._view.parent = this;
    }
}
