import _ from 'lodash';


import PlayerCards from './PlayerCards';


export default class PlayerCardsFactory {
    constructor() {

    }


    static getDecksViewsProperties() {
        return {
            you: {
                hand: {
                    x: 750, y: 700, faceUp: true,
                    draggable: false, padding: -50
                },
                table: {
                    x: 750, y: 440, faceUp: true,
                    draggable: true, padding: -70
                },
                deck: {
                    x: 1200, y: 700, faceUp: false,
                    draggable: false
                },
                graveyard: {
                    x: 1200, y: 570, faceUp: true,
                    draggable: true
                },
                manaPool: {
                    x: 750, y: 570, faceUp: false,
                    draggable: false, padding: -50
                }
            },

            enemy: {
                hand: {
                    x: 750, y: 20, faceUp: false,
                    draggable: false, padding: -50
                },
                table: {
                    x: 750, y: 280, faceUp: true,
                    draggable: false, padding: -70
                },
                deck: {
                    x: 1200, y: 20, faceUp: false,
                    draggable: false
                },
                graveyard: {
                    x: 1200, y: 150, faceUp: true,
                    draggable: true
                },
                manaPool: {
                    x: 750, y: 150, faceUp: false,
                    draggable: false, padding: -50
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