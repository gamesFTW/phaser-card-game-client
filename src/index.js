
//
//var GameController = require('./Main').GameController;
//
//
//
//var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'test', null, false, false);
//
//var isoGroup, cursorPos, cursor, heroGroup, heroSprite;
//
//class BootStage extends GameController {
//
//    create() {
//        // Create a group for our tiles.
//        isoGroup = game.add.group();
//        isoGroup.enableBody = true;
//        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;
//
//        heroGroup = game.add.group();
//        heroGroup.enableBody = true;
//        heroGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;
//
//        // Let's make a load of tiles on a grid.
//        this.spawnTiles();
//        this.spawnHero();
//
//        // Provide a 3D position for the cursor
//        cursorPos = new Phaser.Plugin.Isometric.Point3();
//        window.cu = cursorPos;
//    }
//
//    update() {
//        // Update the cursor position.
//        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
//        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
//        game.iso.unproject(game.input.activePointer.position, cursorPos);
//
//        let inBounds = heroSprite.isoBounds.containsXYBlad(cursorPos.x, cursorPos.y);
//        if (inBounds) {
//            if (game.input.mousePointer.isDown) {
//                console.log('hero is clicked');
//                //heroSprite.isoPosition.copyFrom(tile.isoBounds);
//            }
//        }
//        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
//        isoGroup.forEach(function (tile) {
//            let inBounds = tile.isoBounds.containsXYBlad(cursorPos.x, cursorPos.y);
//
//
//            //console.log(cursorPos.x, cursorPos.y)
//            //console.log('bounds:',cursorPos.x, cursorPos.y)
//            // If it does, do a little animation and tint change.
//            if (inBounds) {
//                if (game.input.mousePointer.isDown) {
//                    game.add.tween(heroSprite).to({ isoX: tile.isoX, isoY: tile.isoY }, 1000,  Phaser.Easing.Quadratic.InOut, true);
//                    //heroSprite.isoPosition.copyFrom(tile.isoBounds);
//                }
//            }
//
//            if (!tile.selected && inBounds) {
//                tile.selected = true;
//                tile.tint = 0x86bfda;
//                game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
//
//            }
//            // If not, revert back to how it was.
//            else if (tile.selected && !inBounds) {
//                tile.selected = false;
//                tile.tint = 0xffffff;
//                game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
//            }
//        });
//    }
//
//    render() {
//        isoGroup.forEach(function (tile) {
//            game.debug.body(tile, 'rgba(189, 221, 235, 1)', false);
//        });
//        heroGroup.forEach(function (tile) {
//            game.debug.body(tile, 'rgba(189, 221, 235, 1)', false);
//        });
//        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
//    }
//
//    spawnTiles() {
//        var tile;
//        for (var xx = 0; xx < 256; xx += 38) {
//            for (var yy = 0; yy < 256; yy += 38) {
//                // Create a tile using the new game.add.isoSprite factory method at the specified position.
//                // The last parameter is the group you want to add it to (just like game.add.sprite)
//                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
//                tile.anchor.set(0, 1);
//                //tile.anchor.set(0.5, 0);
//                tile.smoothed = false;
//                tile.body.moves = false;
//                //
//                //tile = game.add.isoSprite(x, y, tileArray[tiles[i]].match("water") ? 0 : game.rnd.pick([2, 3, 4]), 'tileset', tileArray[tiles[i]], isoGroup);
//                //tile.anchor.set(0.5, 1);
//                //tile.smoothed = false;
//                //tile.body.moves = false;
//            }
//        }
//    }
//
//    spawnHero() {
//        heroSprite = game.add.isoSprite(200, 200, 0, 'hero', 0, heroGroup);
//        heroSprite.anchor.set(0, 1);
//        heroSprite.body.moves = false;
//        window.h = heroSprite;
//
//        //heroSprite.inputEnabled = true;
//        //heroSprite.input.enableDrag();
//    }
//};
//
//game.state.add('Boot', BootStage);
//game.state.start('Boot');
