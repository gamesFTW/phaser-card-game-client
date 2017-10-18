import BackendAdapter from 'BackendAdapter/BackendAdapter';
import BackendAdapterForReplay from 'BackendAdapter/BackendAdapterForReplay';

let Backend;

if (MeteorApp.data.viewReplayMode) {
    Backend = new BackendAdapterForReplay();
} else {
    Backend = new BackendAdapter();
}

export default Backend;
