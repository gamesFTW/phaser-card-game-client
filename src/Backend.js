import EventEmitter from 'external/EventEmitter';


class Backend extends EventEmitter {
    get CARD_MOVED() { return 'Backend:cardMoved'}
    get CARD_DRAWN() { return 'Backend:cardDrawn'}
    get CARD_REMOVED() { return 'Backend:cardRemoved'}
    get CARD_TAPPED() { return 'Backend:cardTapped'}
    get CARD_UNTAPPED() { return 'Backend:cardUntapped'}
    get CARD_PLAYED() { return 'Backend:cardPlayed'}
    get CARD_PLAYED_AS_SPELL() { return 'Backend:cardPlayedAsSpell'}
    get CARD_PLAYED_AS_MANA() { return 'Backend:cardPlayedAsMana'}
    get CARD_HEALTH_CHANGED() { return 'Backend:cardHealthChanged'}
    get CARD_COUNTER_CHANGED() { return 'Backend:cardCounterChanged'}
    get CARD_DIED() { return 'Backend:cardDied'}
    get CARD_ROTATED() { return 'Backend:cardRotated'}
    get CARD_MOVED_TO_PREVIOUS_GROUP() { return 'Backend:cardMovedToPreviousGroup'}
    get CARD_CREATED() { return 'Backend:cardCreated'}
    get CARD_TOOK_FROM_GRAVEYARD() { return 'Backend:cardTookFromGraveyard'}


    constructor() {
        super();

        this.listenServerActions();
    }

    listenServerActions() {
        //TODO ХАК для того что бы все прошлые эвенты не пожгружались
        var initializing = true;
        
        console.log('gameId', this.getGameId());

        MeteorApp.Actions.find({gameId: this.getGameId()}).observe({
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


    //TODO rename to playCardAsMana
    playAsMana(id) {
        Meteor.call('playAsMana', this.getGameId(), id);
    }


    playCard(id, position) {
        Meteor.call('playCard', this.getGameId(), id, position);
    }


    playCardAsSpell(playedCardId, targetCardId) {
        Meteor.call('playCardAsSpell', this.getGameId(), playedCardId, targetCardId);
    }


    moveCardToPreviousGroup(id) {
        Meteor.call('moveCardToPreviousGroup', this.getGameId(), id);
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
