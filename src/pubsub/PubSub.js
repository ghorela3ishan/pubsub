/**
 * create a local variable to store reference to PubsubClass instance
 */
let pubsub;
// check to verify is pubsub variables already exists on window to prevent override
if(typeof(window.pubsub) == 'undefined'){
    class PubsubClass {
        /**
         * constructor below checks if instance property already exists on PubsubClass prototype ( to make
         * 'PubsubClass', a singleton class ). 
         * subscriptions ( class property ) is an object that contains key value pairs of event 
         * (event type will be string) and an array of associated callbacks.
         */ 
        
        constructor() {
            if(!PubsubClass.instance) {
                this.subscriptions = {};
                PubsubClass.instance = this;
            }
            return PubsubClass.instance;
        }

        /**
         * adds the received eventHandler to the array of received event after binding with provided context
         * and returns an object that contains callback to remove the eventHandler from the event array
         * @param { string }  event
         * @param { eventHandler } callback
         * @param { context } object
         */
        subscribe = (event, eventHandler, context = window) => {
                if (event == '' || event == undefined) {
                    throw { 
                            type: 'Error',
                            message: 'event name can not be left blank.'            
                    }
                }
                if (typeof(eventHandler) != 'function') {
                    throw { 
                            type: 'Error',
                            message: `eventHandler ${eventHandler} must be of type function`            
                    }
                }
                let eventHandlerWithContext = eventHandler.bind(context);
                if(!this.subscriptions[event]) {
                    this.subscriptions[event] = {};
                }
                let timeStamp = +new Date();
                let random = Math.random();
                let key = timeStamp * random;
                this.subscriptions[event][key] = eventHandlerWithContext;
                return ({
                    unsubscribe: () => {
                        delete this.subscriptions[event][key];
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
            if( event == '' || event == undefined) throw { 
                type: 'Error',
                message: 'event name can not be left blank.'            
            };
            if(!this.subscriptions[event]) return;
            Object.keys(this.subscriptions[event]).forEach((key) => {
                let eventHandler = this.subscriptions[event][key];
                eventHandler(payload);
            });
        };
    }
    pubsub = new PubsubClass();
    // bind to window so that globally single instance is maintained to prevent overriding of subscriptions
    window.pubsub = pubsub;
}
else{
   pubsub = window.pubsub; 
}
export default pubsub;


