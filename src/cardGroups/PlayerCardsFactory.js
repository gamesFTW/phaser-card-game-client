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
                    x: 1290, y: 835, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                table: {
                    x: 1290, y: 750, faceUp: true,
                    padding: 5, adaptive:true,
                    maxWidth: 385, verticalPadding: -15
                },
                deck: {
                    x: 1615, y: 565, faceUp: false
                },
                manaPool: {
                    x: 1290, y: 650, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                graveyard: {
                    x: 1550, y: 565, faceUp: true
                }
            },

            enemy: {
                hand: {
                    x: 1290, y: 5, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                table: {
                    x: 1290, y: 105, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 385, verticalPadding: -15
                },
                deck: {
                    x: 1615, y: 275, faceUp: false
                },
                manaPool: {
                    x: 1290, y: 190, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                graveyard: {
                    x: 1550, y: 275, faceUp: true
                }
            },

            ally: {
                hand: {
                    x: 5, y: 835, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                table: {
                    x: 5, y: 750, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 385, verticalPadding: -15
                },
                deck: {
                    x: 5, y: 565, faceUp: false
                },
                manaPool: {
                    x: 5, y: 650, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                graveyard: {
                    x: 70, y: 565, faceUp: true
                }
            },

            enemy2: {
                hand: {
                    x: 5, y: 5, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                table: {
                    x: 5, y: 105, faceUp: true,
                    padding: 5, adaptive: true,
                    maxWidth: 385, verticalPadding: -15
                },
                deck: {
                    x: 5, y: 275, faceUp: false
                },
                manaPool: {
                    x: 5, y: 190, faceUp: false,
                    padding: 5, adaptive: true,
                    maxWidth: 385
                },
                graveyard: {
                    x: 70, y: 275, faceUp: true
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
