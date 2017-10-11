import BackendAdapter from 'BackendAdapter/BackendAdapter';
import BackendForViewMode from 'BackendAdapter/BackendForViewMode';

let Backend;

if (MeteorApp.data.viewReplayMode) {
    Backend = new BackendForViewMode();
} else {
    Backend = new BackendAdapter();
}

export default Backend;
