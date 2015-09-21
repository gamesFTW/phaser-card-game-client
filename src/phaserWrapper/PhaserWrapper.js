var _ = require('lodash');
var Phaser = require('plugins/isometric').Phaser;


/**
 * Create, set up, and contain instance of Phaser.Game. Singleton.
 */
class PhaserWrapper {
    set createFinished(value) {this._createFinished = value; }
    get game() {return this._game; }


    constructor() {
        this._game = new Phaser.Game(
            1200, 800, Phaser.AUTO, 'gameView', null, false, false
        );

        var self = this;
        this._game.state.add('Boot', {
            preload: PhaserWrapper._preload,
            create: function() {
                self._createFinished();
            },
            update: PhaserWrapper._update,
            render: PhaserWrapper._render
        });

        this._game.state.start('Boot');
    }


    static _preload(game) {
        game.time.advancedTiming = true;

        game.load.image('tile', '../assets/tile.png');
        game.load.image('hero', '../assets/hero.png');

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.5, 0.5);
    }


    static _create() {
        this._createFinished();
    }


    static _update() {

    }


    static _render() {

    }
}


// Всегда отдает один инстанс
export default new PhaserWrapper();
