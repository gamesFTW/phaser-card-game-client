import _ from 'lodash';


import PlayerCards from './PlayerCards';


export default class PlayerCardsFactory {
    constructor() {

    }


    static getDecksViewsProperties() {
        // Не уверен что у нас правильные maxWidth
        return {
            you: {
                hand: {
                    x: 920, y: 596, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 380
                },
                table: {
                    x: 1090, y: 513, faceUp: true,
                    padding: 5, adaptive:true,
                    maxWidth: 250
                },
                deck: {
                    x: 1320, y: 596, faceUp: false
                },
                graveyard: {
                    x: 1308, y: 348, faceUp: true
                },
                manaPool: {
                    x: 1250, y: 430, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 100
                }
            },

            enemy: {
                hand: {
                    x: 920, y: 17, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 380
                },
                table: {
                    x: 1090, y: 101, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 250
                },
                deck: {
                    x: 1320, y: 17, faceUp: false
                },
                graveyard: {
                    x: 1308, y: 267, faceUp: true
                },
                manaPool: {
                    x: 1250, y: 185, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 100
                }
            }
        };
    }


    static createPlayerCards(playersIds, yourId) {
        return _.transform(playersIds, function(obj, id) {
            var playerType = yourId == id ? 'you': 'enemy';
            var decksViewsProperties = PlayerCardsFactory.getDecksViewsProperties()[playerType];
            obj[id] = new PlayerCards(id, playerType, decksViewsProperties);
        }, {});
    }
}