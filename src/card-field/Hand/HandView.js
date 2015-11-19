import CardManager from './../CardManager.js';


export default class HandView extends CardManager {
    constructor() {
        // TODO подобрать позицию
        super(20, 600, true);

        // TODO debug, remove later
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();

    }
}
