if(typeof(window.pubsubInstance) == 'undefined'){
    class Pubsub {
        /**
         * constructor below checks if instance property already exists on Pubsub prototype ( to make
         * 'Pubsub', a singleton class ). 
         * subscriptions ( class property ) is an object that contains key value pairs of event 
         * (event type will be string) and an array of associated callbacks.
         */ 
        constructor() {
            if(!Pubsub.instance) {
                this.subscriptions = {};
                Pubsub.instance = this;
            }
            return Pubsub.instance;
        }

        /**
         * adds the received eventHandler to the array of received event after binding with provided context
         * and returns an object that contains callback to remove the eventHandler from the event array
         * @param { string }  event
         * @param { eventHandler } callback
         * @param { context } object
         */
        subscribe = (event, eventHandler, context = window) => {
                if (typeof(eventHandler) != 'function') {
                    throw { 
                            type: 'Error',
                            message: `eventHandler ${eventHandler} must be of type function`            
                    }
                }
                let eventHandlerWithContext = eventHandler.bind(context);
                if(!this.subscriptions[event]) {
                    this.subscriptions[event] = [];
                }
                let position = this.subscriptions[event].push(eventHandlerWithContext);
                let index = position - 1;
                return ({
                    unsubscribe: () => {
                        this.subscriptions[event].splice(index, 1);
                    }   
                });
            };

        /**
         * invokes all the callbacks contained in the event (received in parameter) property of 
         * subscriptions array with the payload received 
         * @param { event } string
         * @param { payload } object
         */
        publish = (event, payload) => {
            if(!this.subscriptions[event]) return;
            this.subscriptions[event].forEach(eventHandler => {
                eventHandler(payload);
            });
        };
    }
    window.pubsubInstance = new Pubsub();
}


