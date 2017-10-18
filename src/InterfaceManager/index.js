import InterfaceManager from 'InterfaceManager/InterfaceManager';
import InterfaceManagerForReplay from 'InterfaceManager/InterfaceManagerForReplay';

let InterfaceManagerClass;

if (MeteorApp.data.viewReplayMode) {
    InterfaceManagerClass = InterfaceManagerForReplay;
} else {
    InterfaceManagerClass = InterfaceManager;
}

export {InterfaceManagerClass as InterfaceManager};
