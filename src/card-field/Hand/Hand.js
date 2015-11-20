import CardManager from './../CardManager';
import HandView from './HandView';


export default class Hand extends CardManager {

    constructor() {
        super();

        this._view = new HandView();
        this._view.parent = this;

        //TODO убрать, debug
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();


    }
}
