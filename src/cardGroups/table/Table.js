import CardGroupManager from './../CardGroupManager';
import TableView from './TableView';


export default class Table extends CardGroupManager {
    constructor(viewProperties) {
        super();

        this._view = new TableView(viewProperties);
        this._view.parent = this;
    }
}
