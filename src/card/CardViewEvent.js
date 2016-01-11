export default class CardViewEvent {
    static get CLICK() { return 'CardViewEvent:click' }
    static get CTRL_CLICK() { return 'CardViewEvent:ctrlClick' }
    static get DBL_CLICK() { return 'CardViewEvent:doubleClick'}

    static get STOP_DRAG() { return 'CardViewEvent:stopDrag' }
    static get OVER() { return 'CardViewEvent:over' }
    static get OUT() { return 'CardViewEvent:out' }
}
