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
                    maxWidth: 250, verticalPadding: - 15
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
                    maxWidth: 250, verticalPadding: 15
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
                    maxWidth: 250, verticalPadding: - 15
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
                    maxWidth: 250, verticalPadding: 15
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


    static createPlayerCards(gameType, playersIds, yourId) {
        var friends = {};
        var enemies = {};

        var player1Id = playersIds[0];
        var player2Id = playersIds[1];
        var player3Id = playersIds[2];
        var player4Id = playersIds[3];

        if (gameType == 'solo') {
            enemies[player1Id] = [player2Id];
            enemies[player2Id] = [player1Id];
        } else if (gameType == 'ogre') {
            enemies[player1Id] = [player2Id, player4Id];
            enemies[player2Id] = [player1Id, player3Id];
            enemies[player3Id] = [player2Id, player4Id];
            enemies[player4Id] = [player1Id, player3Id];

            friends[player1Id] = player3Id;
            friends[player2Id] = player4Id;
            friends[player3Id] = player1Id;
            friends[player4Id] = player2Id;
        } else {
            console.error('Unknown game type.');
        }

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
