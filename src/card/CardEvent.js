export default class CardEvent {
    static get CARD_CLICK() { return 'CardEvent:cardClick'}
    static get CARD_MIDDLE_CLICK() { return 'CardEvent:cardMiddleClick'}
    static get CARD_RIGHT_CLICK() { return 'CardEvent:cardRightCLick' }

    
    static get FIELD_CLICK() { return 'CardEvent:fieldClick' }
    static get FIELD_MIDDLE_CLICK() { return 'CardEvent:fieldMiddleClick'}
    
    
    static get DISPOSE() { return 'CardEvent:dispose'}
    // Эти два события используются и в FieldView и во CardView
    static get OVER() { return 'CardEvent:over' }
    static get OUT() { return 'CardEvent:out' }
}
