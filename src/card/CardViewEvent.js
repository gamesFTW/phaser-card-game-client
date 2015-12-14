export default class CardViewEvent {
    static get CLICK() { return 'CardViewEvent:click' }
    static get CTRL_CLICK() { return 'CardViewEvent:ctrlClick' }
    static get DBL_CLICK() { return 'CardViewEvent:doubleClick'}

    static get STOP_DRAG() { return 'CardViewEvent:stopDrag' }
    static get START_DRAG() { return 'CardViewEvent:startDrag' }
}
