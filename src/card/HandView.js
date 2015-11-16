import BaseCardViewManager from './BaseCardViewManager.js';


export default class HandView extends BaseCardViewManager {
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
