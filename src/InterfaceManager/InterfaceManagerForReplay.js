import InterfaceManager from 'InterfaceManager/InterfaceManager';
import Backend from 'BackendAdapter';
import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import lodash from 'lodash';


export default class InterfaceManagerForReplay extends InterfaceManager {
    _createHandlers() {
        super._createHandlers();
        this._createReplaySpeedHandler();
    }


    _createReplaySpeedHandler() {
        let keys = [
            Phaser.Keyboard.Q,
            Phaser.Keyboard.W,
            Phaser.Keyboard.E,
            Phaser.Keyboard.R,
            Phaser.Keyboard.T,
        ];

        let replaySpeedFunctions = [
            Backend.replaySpeedOne,
            Backend.replaySpeedTwo,
            Backend.replaySpeedThree,
            Backend.replaySpeedFour,
            Backend.replaySpeedFive,
        ];

        lodash.forEach(keys, (key, index) => {
            let phaserKey = PhaserWrapper.game.input.keyboard.addKey(key);
            phaserKey.onDown.add(replaySpeedFunctions[index], Backend);
        });
    }


    _onSpacePress() {
        Backend.togglePause();
    }
}
