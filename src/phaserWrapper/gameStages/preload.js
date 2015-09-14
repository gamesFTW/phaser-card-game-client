/**
 *
 *
 * @see:
 * Created by Alex Kalmakov <st00nsa@gmail.com>
 */

var Phaser = require('plugins/isometric').Phaser;

export default function(game) {
    game.time.advancedTiming = true;
    //game.debug.renderShdow = false;
    //game.stage.disableVisibilityChange = true;

    game.load.image('tile', '../assets/tile.png');
    game.load.image('hero', '../assets/hero.png');

    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.iso.anchor.setTo(0.5, 0.5);
};
