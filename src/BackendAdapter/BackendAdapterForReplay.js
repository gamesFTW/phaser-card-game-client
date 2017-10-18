import Backend from 'BackendAdapter/BackendAdapter';


class BackendAdapterForReplay extends Backend {
    constructor() {
        super();

        /**
         * @type {number}
         */
        this._replaySpeed = 1;

        /**
         * @type {number}
         */
        this._timeBeforeNextActionThreshold = 3;

        /**
         * @type {boolean}
         */
        this._isReplayPaused = true;

        /**
         * @type {Object[]}
         * @private
         */
        this._actions = [];

        /**
         * @type {number|null}
         * @private
         */
        this._currentActionTimer = null;

        /**
         * @type {null}
         * @private
         */
        this._initialActionsCount = null;
    }


    listenServerActions() {
        console.log('Actions listening is disabled');
    }
    
    
    loadActionHistory() {
        this._actions = MeteorApp.Actions.find({gameId: this.getGameId()}, {sort: {datetime: 1}}).fetch();
        this._initialActionsCount = this._actions.length;
    }


    togglePause() {
        if (this._isReplayPaused) {
            this._playReplay();
        } else {
            this._pauseReplay();
        }
    }


    replaySpeedOne() {
        this._replaySpeed = 1;
        this._timeBeforeNextActionThreshold = 3;
    }


    replaySpeedTwo() {
        this._replaySpeed = 1;
        this._timeBeforeNextActionThreshold = 1;
    }


    replaySpeedThree() {
        this._replaySpeed = 2;
        this._timeBeforeNextActionThreshold = 1;
    }


    replaySpeedFour() {
        this._replaySpeed = 4;
        this._timeBeforeNextActionThreshold = 1;
    }


    replaySpeedFive() {
        this._replaySpeed = 8;
        this._timeBeforeNextActionThreshold = 1;
    }


    _playReplay() {
        this._isReplayPaused = false;

        this._nextActionTick();
    }
    
    
    _pauseReplay() {
        clearTimeout(this._currentActionTimer);

        this._isReplayPaused = true;
    }
    
    
    _nextActionTick() {
        if (this._isReplayPaused) {
            return;
        }
    
        let currentAction = this._actions.shift();
        let nextAction = this._actions[0];
        
        if (currentAction === undefined || nextAction === undefined) {
            console.log('Спасибо за просмотр!');
            return;
        }
        
        this._preformAction(currentAction);
        
        let waitTimeSecs = this._calculateTimeBeforeNextAction(currentAction, nextAction);

        this._currentActionTimer = setTimeout(() => this._nextActionTick(), waitTimeSecs * 1000);
    }


    _preformAction(currentAction) {
        this.emit(currentAction.type, currentAction.params);

        console.log(`Actions: ${this._actions.length}/${this._initialActionsCount}`)
    }
    

    _calculateTimeBeforeNextAction(currentAction, nextAction) {
        let timeDiffSecs = Math.abs((nextAction.datetime.getTime() - currentAction.datetime.getTime()) / 1000);
        let waitTimeSecs = this._timeBeforeNextActionThreshold;

        if (timeDiffSecs < this._timeBeforeNextActionThreshold) {
            waitTimeSecs = timeDiffSecs;
        }

        waitTimeSecs = waitTimeSecs / this._replaySpeed;

        return waitTimeSecs;
    }


    getCards() {
        return MeteorApp.Games.find(this.getGameId()).fetch()[0].initialStateCards
            .map(function(card) {
                let cardData = card;
                cardData['id'] = cardData['_id'];
                delete cardData['_id'];

                return cardData;
            });
    }
}

export default BackendAdapterForReplay;
