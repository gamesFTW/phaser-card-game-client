import EventEmitter from 'external/EventEmitter';

var Card = MeteorApp.Card;
var Action = MeteorApp.Action;


class Backend extends EventEmitter {
    get CARD_MOVED() { return 'Backend:cardMoved'}
    get CARD_DRAWN() { return 'Backend:cardDrawn'}
    get CARD_REMOVED() { return 'Backend:cardRemoved'}
    get CARD_TAPPED() { return 'Backend:cardTapped'}
    get CARD_UNTAPPED() { return 'Backend:cardUntapped'}
    get CARD_PLAYED() { return 'Backend:cardPlayed'}
    get CARD_PLAYED_AS_SPELL() { return 'Backend:cardPlayedAsSpell'}
    get CARD_HEALTH_CHANGED() { return 'Backend:cardHealthChanged'}
    get CARD_COUNTER_CHANGED() { return 'Backend:cardCounterChanged'}
    get CARD_DIED() { return 'Backend:cardDied'}
    get CARD_PLAYED_AS_MANA() { return 'Backend:cardPlayedAsMana'}
    get CARD_MOVED_TO_PREVIOUS_GROUP() { return 'Backend:cardMovedToPreviousGroup'}


    constructor() {
        super();

        this.listenServerActions();
    }

    listenServerActions() {
        //TODO ХАК для того что бы все прошлые эвенты не пожгружались
        var initializing = true;

        Action.find().observe({
            added: function(action) {
                if(!initializing) {
                    this.emit(action.type, action.params);
                }
            }.bind(this)
        });

        initializing = false;
    }


    // ----------------------- Getters -----------------------
    // TODO: move it to class.
    getCards() {
        return Card.find().fetch().map(function(card) {
            // TODO здесь хочется сделать нормальное отбрасывание ненужного из cardData
            // TODO Тоесть хочется отдавать только нужно для создание карты у плеера
            var cardData = card;
            cardData['id'] = cardData['_id'];
            delete cardData['_id'];

            return cardData;
        });
    }


    getPlayerId() {
        return MeteorApp.data.playerId;
    }


    getPlayersIds() {
        return MeteorApp.data.gameType == 'solo' ? ['1', '2'] : ['1', '2', '3', '4'];
    }


    // ----------------------- Setters -----------------------
    // TODO: move it to class.
    endTurn() {
        Meteor.call('endTurn', this.getPlayerId());
    }

    removeCard(id) {
        Meteor.call('removeCard', id);
    }


    moveCardTo(id, position) {
        Meteor.call('moveCard', id, position);
    }


    tapCard(id) {
        Meteor.call('tapCard', id);
    }


    drawCard(id) {
        Meteor.call('drawCard', id);
    }


    untapCard(id) {
        Meteor.call('untapCard', id);
    }


    //TODO rename to playCardAsMana
    playAsMana(id) {
        Meteor.call('playAsMana', id);
    }


    playCard(id, position) {
        Meteor.call('playCard', id, position);
    }


    playCardAsSpell(playedCardId, targetCardId) {
        Meteor.call('playCardAsSpell', playedCardId, targetCardId);
    }


    moveCardToPreviousGroup(id) {
        Meteor.call('moveCardToPreviousGroup', id);
    }


    addHealth(id, health) {
        Meteor.call('addHealth', id, health);
    }


    addCounter(id, counter) {
        Meteor.call('addCounter', id, counter);
    }
}


export default new Backend();
