import BaseCardViewManager from './BaseCardViewManager.js';


export default class HandView extends BaseCardViewManager {
    constructor() {
        super(20, 600);

        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();
        this.addRandomCard();

    }
}
