export default class CardEvent {
    static get CARD_CLICK() { return 'CardEvent:cardClick'}
    static get PLAY_AS_MANA() { return 'CardEvent:playAsMana'}
    static get FIELD_CLICK() { return 'CardEvent:fieldClick'}
    static get DISPOSE() { return 'CardEvent:dispose'}
    static get MOVED() { return 'CardEvent:moved' }
    static get PRESS_TAP() { return 'CardEvent:pressTap' }
    static get PRESS_UNTAP() { return 'CardEvent:pressUntap' }
    static get ROTATE() { return 'CardEvent:rotate' }

    static get OVER() { return 'CardEvent:over' }
    static get OUT() { return 'CardEvent:out' }
}
