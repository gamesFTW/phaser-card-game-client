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
                    x: 750, y: 700, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 400
                },
                table: {
                    x: 750, y: 440, faceUp: true,
                    padding: 5, adaptive:true,
                    maxWidth: 500
                },
                deck: {
                    x: 1200, y: 700, faceUp: false
                },
                graveyard: {
                    x: 1200, y: 570, faceUp: true
                },
                manaPool: {
                    x: 750, y: 570, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 400
                }
            },

            enemy: {
                hand: {
                    x: 750, y: 20, faceUp: false,
                    padding: -50, adaptive: true,
                    maxWidth: 400
                },
                table: {
                    x: 750, y: 280, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 500
                },
                deck: {
                    x: 1200, y: 20, faceUp: false
                },
                graveyard: {
                    x: 1200, y: 150, faceUp: true
                },
                manaPool: {
                    x: 750, y: 150, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 400
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