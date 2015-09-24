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

        this._game.state.add('Boot', {
            preload: this._preload.bind(this),
            create: this._create.bind(this),
            update: this._update.bind(this),
            render: this._render.bind(this)
        });

        this._game.state.start('Boot');
    }


    _preload() {
        this._game.time.advancedTiming = true;

        this._game.load.image('tile', '../assets/tile.png');
        this._game.load.image('hero', '../assets/hero.png');

        this._game.plugins.add(new Phaser.Plugin.Isometric(this._game));

        this._game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        this._game.iso.anchor.setTo(0.5, 0.5);
    }


    _create() {
        this._createFinished();
    }


    _update() {

    }


    _render() {

    }
}


// Всегда отдает один инстанс
export default new PhaserWrapper();
