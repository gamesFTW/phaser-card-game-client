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
            },

            ally: {
                hand: {
                    x: 18, y: 596, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 380
                },
                table: {
                    x: 18, y: 513, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 250
                },
                deck: {
                    x: 413, y: 596, faceUp: false
                },
                graveyard: {
                    x: 30, y: 348, faceUp: true
                },
                manaPool: {
                    x: 18, y: 430, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 100
                }
            },

            enemy2: {
                hand: {
                    x: 18, y: 17, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 380
                },
                table: {
                    x: 18, y: 101, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 250
                },
                deck: {
                    x: 413, y: 17, faceUp: false
                },
                graveyard: {
                    x: 30, y: 267, faceUp: true
                },
                manaPool: {
                    x: 18, y: 185, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 100
                }
            }
        };
    }


    static createPlayerCards(playersIds, yourId) {
        var friends = {
            '1': '3',
            '2': '4',
            '3': '1',
            '4': '2'
        };

        var enemies = {
            '1': ['2', '4'],
            '2': ['1', '3'],
            '3': ['2', '4'],
            '4': ['1', '3']
        };

        return _.transform(playersIds, function(obj, id) {
            var playerType = null;
            if (id == yourId) {
                playerType = 'you';
            }
            if (enemies[yourId][0] == id) {
                playerType = 'enemy';
            }
            if (friends[yourId] == id) {
                playerType = 'ally';
            }
            if (enemies[yourId][1] == id) {
                playerType = 'enemy2';
            }

            var decksViewsProperties = PlayerCardsFactory.getDecksViewsProperties()[playerType];
            obj[id] = new PlayerCards(id, decksViewsProperties);
        }, {});
    }
}
