

var DEFAULT_MAX_LISTENERS = 12;

function error(message, ...args){
    console.error.apply(console, [message].concat(args));
    console.trace()
}

export default class EventEmitter {
    constructor() {
        this._parent = null;
        this._maxListeners = DEFAULT_MAX_LISTENERS;
        this._events = {};
    }


    set parent(value) { this._parent = value }


    on(type, listener) {
        if(typeof listener != "function") {
            throw new TypeError();
        }
        var listeners = this._events[type] || (this._events[type] = []);
        if(listeners.indexOf(listener) != -1) {
            return this;
        }
        listeners.push(listener);
        if(listeners.length > this._maxListeners) {
            error(
                "possible memory leak, added %i %s listeners, "+
                "use EventEmitter#setMaxListeners(number) if you " +
                "want to increase the limit (%i now)",
                listeners.length,
                type,
                this._maxListeners
            )
        }
        return this;
    }


    once(type, listener) {
        var eventsInstance = this;
        function onceCallback(){
            eventsInstance.off(type, onceCallback);
            listener.apply(null, arguments);
        }
        return this.on(type, onceCallback);
    }


    off(type, ...args) {
        if(args.length == 0) {
            this._events[type] = null;
        }
        var listener = args[0];
        if(typeof listener != "function") {
            throw new TypeError();
        }
        var listeners = this._events[type];
        if(!listeners || !listeners.length) {
            return this;
        }
        var indexOfListener = listeners.indexOf(listener);
        if(indexOfListener == -1) {
            return this;
        }
        listeners.splice(indexOfListener, 1);
        return this;
    }


    emit(type, event = {}) {
        if (!event.currentTarget) {
            event.currentTarget = this;
        }

        var listeners = this._events[type];
        if (listeners) {
            listeners.forEach(function (fn) {
                fn.call(null, event);
            });

        }

        if (this._parent) {
            event.target = this._parent;

            if (this._parent instanceof EventEmitter) {
                this._parent.emit(type, event);
            }
        }

        return true;
    }


    setMaxListeners(newMaxListeners){
        if(parseInt(newMaxListeners) !== newMaxListeners) {
            throw new TypeError();
        }
        this._maxListeners = newMaxListeners;
    }
}
