import CardGroupManager from './../CardGroupManager';
import GraveyardView from './GraveyardView';


export default class Graveyard extends CardGroupManager {
    constructor(viewProperties) {
        super();

        this._view = new GraveyardView(viewProperties);
        this._view.parent = this;
    }
}
