import EventEmitter from 'external/EventEmitter';


class Backend extends EventEmitter {
    get CARD_MOVED() { return 'Backend:cardMoved'}
    get CARD_DRAWN() { return 'Backend:cardDrawn'}
    get CARD_REMOVED() { return 'Backend:cardRemoved'}
    get CARD_TAPPED() { return 'Backend:cardTapped'}
    get CARD_UNTAPPED() { return 'Backend:cardUntapped'}
    get CARD_PLAYED() { return 'Backend:cardPlayed'}
    get CARD_PLAYED_AS_SPELL() { return 'Backend:cardPlayedAsSpell'}
    get CARD_PLAYED_AS_ATTACH() { return 'Backend:cardPlayedAsAttach'}
    get CARD_PLAYED_AS_MANA() { return 'Backend:cardPlayedAsMana'}
    get CARD_HEALTH_CHANGED() { return 'Backend:cardHealthChanged'}
    get CARD_COUNTER_CHANGED() { return 'Backend:cardCounterChanged'}
    get CARD_DIED() { return 'Backend:cardDied'}
    get CARD_ROTATED() { return 'Backend:cardRotated'}
    get CARD_MOVED_TO_PREVIOUS_GROUP() { return 'Backend:cardMovedToPreviousGroup'}
    get CARD_CREATED() { return 'Backend:cardCreated'}
    get CARD_TOOK_FROM_GRAVEYARD() { return 'Backend:cardTookFromGraveyard'}
    get CARD_DISCARDED() { return 'Backend:cardDiscarded'}
    get PLAYER_TURN_ENDED() { return 'Backend:endOfPlayerTurn'}
    get GAME_TURN_ENDED() { return 'Backend:endOfGameTurn'}
    get TIMER_ALARMED_END_OF_TURN() { return 'Backend:timerAlarmedEndOfPlayerTurn'}
    get GAME_TIMER_TICKED() { return 'Backend:gameTimerTicked'}


    constructor() {
        super();

        this.listenServerActions();
    }

    listenServerActions() {
        //TODO ХАК для того что бы все прошлые эвенты не пожгружались
        let initializing = true;

        let ddpEvents = null;

        if (window.ddpEvents) {
            ddpEvents = window.ddpEvents;
            ddpEvents.removeListener('timerTicked', this._onTimerTicked.bind(this));
        } else {
            ddpEvents = new EventDDP('raix:push', Meteor.connection);
            window.ddpEvents = ddpEvents;
        }
        
        ddpEvents.setClient({
            gameId: this.getGameId()
        });

        MeteorApp.Actions.find({gameId: this.getGameId()}).observe({
            added: function(action) {
                if(!initializing) {
                    this.emit(action.type, action.params);
                }
            }.bind(this)
        });
        
        // Listen events via DPP
        ddpEvents.addListener('timerTicked', this._onTimerTicked.bind(this));
        
        //ddpEvents.emit('token', 'hello you bitch');

        initializing = false;
    }


    _onTimerTicked(timersData) {
        this.emit(this.GAME_TIMER_TICKED, timersData);
    }


    // ----------------------- Getters -----------------------
    // TODO: move it to class.
    getCards() {
        return MeteorApp.CardsInGame.find({gameId: this.getGameId()})
            .map(function(card) {
                // TODO здесь хочется сделать нормальное отбрасывание ненужного из cardData
                // TODO Тоесть хочется отдавать только нужно для создание карты у плеера
                var cardData = card;
                cardData['id'] = cardData['_id'];
                delete cardData['_id'];

                return cardData;
            });
    }


    getCardImages() {
        return MeteorApp.Images.find()
            .map(i => ({_id: i._id, url: i.url()}));
    }


    getMapWidth() {
        return MeteorApp.data.mapWidth;
    }


    getMapHeight() {
        return MeteorApp.data.mapHeight;
    }


    getGameType() {
        return MeteorApp.data.gameType;
    }


    getGameId() {
        return MeteorApp.data.gameId;
    }


    getCurrentPlayerId() {
        return MeteorApp.data.currentPlayerId;
    }
    
    
    getCurrentPlayerIndex() {
        
    }


    getAllPlayersIds() {
        return MeteorApp.data.allPlayersIds;
    }
    
    
    getGameTurnNumber() {
        return MeteorApp.Games.findOne(this.getGameId()).turnNumber || 0;
    }


    // ----------------------- Setters -----------------------
    // TODO: move it to class.
    removeCard(id) {
        Meteor.call('removeCard', this.getGameId(), id);
    }
    
    
    addEndOfTurnEvent() {
        Meteor.call('addEndOfTurnEvent', this.getGameId(), this.getCurrentPlayerId());
    }


    moveCardTo(id, position) {
        Meteor.call('moveCard', this.getGameId(), id, position);
    }


    tapCard(id) {
        Meteor.call('tapCard', this.getGameId(), id);
    }


    drawCard(id) {
        Meteor.call('drawCard', this.getGameId(), id);
    }


    takeCardFromGraveyard(id) {
        Meteor.call('takeCardFromGraveyard', this.getGameId(), id);
    }


    untapCard(id) {
        Meteor.call('untapCard', this.getGameId(), id);
    }
    
    
    tooglePauseGame() {
        Meteor.call('tooglePause', this.getGameId());
    }


    playCard(id, position) {
        Meteor.call('playCard', this.getGameId(), id, position);
    }


    //TODO rename to playCardAsMana
    playAsMana(id) {
        Meteor.call('playAsMana', this.getGameId(), id);
    }


    playCardAsAttach(playedCardId, targetCardId) {
        Meteor.call('playCardAsAttach', this.getGameId(), playedCardId, targetCardId);
    }


    putSpellOnTable(id) {
        Meteor.call('putSpellOnTable', this.getGameId(), id);
    }


    moveCardToPreviousGroup(id) {
        Meteor.call('moveCardToPreviousGroup', this.getGameId(), id);
    }


    discardCard(id) {
        Meteor.call('discardCard', this.getGameId(), id);
    }


    addHealth(id, health) {
        Meteor.call('addHealth', this.getGameId(), id, health);
    }


    addCounter(id, counter) {
        Meteor.call('addCounter', this.getGameId(), id, counter);
    }


    rotateCard(id) {
        Meteor.call('rotateCard', this.getGameId(), id);
    }
}

export default new Backend();
