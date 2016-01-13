import _ from 'lodash';


import PlayerCards from './PlayerCards';


export default class PlayerCardsFactory {
    constructor() {

    }


    static getDecksViewsProperties() {
        return {
            you: {
                hand: {
                    x: 50, y: 750, faceUp: true,
                    draggable: false, padding: -50
                },
                table: {
                    x: 550, y: 500, faceUp: true,
                    draggable: true, scale: 1, padding: -100
                },
                deck: {
                    x: 1050, y: 750, faceUp: false,
                    draggable: false
                },
                graveyard: {
                    x: 50, y: 550, faceUp: true,
                    draggable: true
                }
            },

            enemy: {
                hand: {
                    x: 550, y: 50, faceUp: false,
                    draggable: false, padding: -100
                },
                table: {
                    x: 550, y: 300, faceUp: true,
                    draggable: false, scale: 1, padding: -100
                },
                deck: {
                    x: 1050, y: 50, faceUp: false,
                    draggable: false
                },
                graveyard: {
                    x: 200, y: 550, faceUp: true,
                    draggable: true
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