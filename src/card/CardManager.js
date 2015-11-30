import EventEmitter from 'external/EventEmitter';
import Card from 'card/Card';
import CardInFieldManager from 'card/CardInFieldManager';
import PlayerCards from 'card-groups/PlayerCards';
import Backend from 'Backend';


export default class CardManager extends EventEmitter {
    constructor() {
        super();


        /**
         * @type {CardInFieldManager}
         * @private
         */
        this._cardInFieldManager = new CardInFieldManager();


        this._activePlayer = new PlayerCards('123', 'you');


        this._cards = {};


        //TODO: remove it to MoveAction class
        Backend.on(Backend.CARD_MOVED, this._onCreatureMoved.bind(this));
        Backend.on(Backend.CARD_REMOVED, this._onCreatureRemoved.bind(this));
    }


    /*
    TODO убрать нужно только для дебага
     */
    addRandomCard() {
        let data = {
            id: _.random(10000).toString(),
            title: _.sample(['Жирный орк', 'Тонкий орк', 'Средний орк']),
            type: 'creature',
            text: 'Любит есть',
            dmg: _.sample([1, 2, 3]),
            health: _.sample([1, 3, 4]),
            img: [1,2,3].map(i => 'card/orc' + i)
        };

        this.createCard(data);
    }


    findById(id) {
        return this._cards[id];
    }


    createCard(cardData) {
        let card = new Card(cardData);
        card.parent = this;

        this._addCard(card);

        return card;
    }


    removeCard(id) {
        let card = this.findById(id);
        card.dispose();
        delete this._cards[id];
    }


    _addCard(card) {
        this._cards[card.id] = card;
    }


    //TODO: remove it to MoveAction class
    _onCreatureMoved(event) {
        var card = this.findById(event.id);
        card.position = event.position;
    }


    //TODO: remove it to MoveAction class
    _onCreatureRemoved(event) {
        this.removeCard(event.id);
    }
}
