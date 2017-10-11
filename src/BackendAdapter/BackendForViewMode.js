import Backend from 'BackendAdapter/BackendAdapter';


class BackendForViewMode extends Backend {
    listenServerActions() {
        console.log('Actions listening is disabled');
    }
    
    playHistory() {
        
        const BANED_ACTIONS_TYPES = [
            'Backend:endOfGameTurn',
            'Backend:endOfPlayerTurn',
            'Backend:timerAlarmedEndOfPlayerTurn',
            'Backend:gameTimerTicked'
            
        ];
        
        const TIME_THRESHOLD_SEC = 3;
        const actions = MeteorApp.Actions.find({gameId: this.getGameId()}, {sort: {datetime: 1}}).fetch();


        function preformAction(leftActions) {
            var currentAction = leftActions.shift();
            var nextAction = leftActions[0];

            if (currentAction === undefined || nextAction === undefined) {
                return ;
            }


            console.log('Preform action', currentAction);
            this.emit(currentAction.type, currentAction.params);
            
            var timeDiffSecs = Math.abs((nextAction.datetime.getTime() - currentAction.datetime.getTime()) / 1000);
            var waitTimeSecs = TIME_THRESHOLD_SEC;
            
            if (timeDiffSecs < TIME_THRESHOLD_SEC) {
                waitTimeSecs = timeDiffSecs;
            }
            
            console.log('Wait for next action, sec', waitTimeSecs);
            setTimeout(() => preformAction.bind(this)(leftActions), waitTimeSecs * 1000);

        }

        console.log('Future actions ', actions);
        preformAction.bind(this)(actions);
    }

    getCards() {
        return MeteorApp.Games.find(this.getGameId()).fetch()[0].initialStateCards
            .map(function(card) {
                var cardData = card;
                cardData['id'] = cardData['_id'];
                delete cardData['_id'];

                return cardData;
            });
    }
}

export default BackendForViewMode;
