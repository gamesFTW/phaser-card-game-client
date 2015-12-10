import CardGroupManager from './../CardGroupManager';
import TableView from './TableView';


export default class Table extends CardGroupManager {
    constructor() {
        super();

        this._view = new TableView();
        this._view.parent = this;
    }
}
