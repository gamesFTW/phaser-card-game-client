export default class CardViewEvent {
    static get CLICK() { return 'CardViewEvent:click' }
    static get MIDDLE_CLICK() { return 'CardViewEvent:middleClick' }
    static get RIGHT_CLICK() { return 'CardViewEvent:rightClick' }

    static get OVER() { return 'CardViewEvent:over' }
    static get OUT() { return 'CardViewEvent:out' }

    static get DOWN_PRESS() { return 'CardViewEvent:downPress' }
    static get UP_PRESS() { return 'CardViewEvent:upPress' }
    static get LEFT_PRESS() { return 'CardViewEvent:leftPress' }
    static get RIGHT_PRESS() { return 'CardViewEvent:rightPress' }

    static get ZOOM_IN() { return 'CardViewEvent:zoomIn' }
    static get ZOOM_OUT() { return 'CardViewEvent:zoomOut' }
}
