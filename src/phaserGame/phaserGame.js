var _ = require('lodash');

var Phaser = require('plugins/isometric').Phaser;

var preload = require('./gameStages/preload');

class PhaserGame {

    constructor() {
        this.game = new Phaser.Game(1200, 800, Phaser.AUTO, 'gameView', null, false, false);

        this.game.state.add('Boot', { preload: preload });
        this.game.state.start('Boot');

    }

}
// Всегда отдает
export default new PhaserGame();
