class Pubsub {
    // object that contains key value pairs of event and an array of associated callbacks
    subscriptions = {};

    // adds the received eventHandler to the array of received event after binding with provided context
    // and returns an object that contains callback to remove the eventHandler from the event array 
    subscribe = (event, eventHandler, context = window) => {
            let eventHandlerWithContext = eventHandler.bind(context);
            if(!this.subscriptions[event]) {
                this.subscriptions[event] = [];
            }
            let position = this.subscriptions[event].push(eventHandlerWithContext);
            let index = position - 1;
            return ({
                unsubscribe: () => {
                    console.log(this, index, event, this.subscriptions);
                    this.subscriptions[event].splice(index, 1);
                }   
            });
        };

    // invokes all the callbacks contained in the event (received in parameter) array with the payload received 
    publish = (event, payload) => {
        if(!this.subscriptions[event]) return;
        this.subscriptions[event].forEach(eventHandler => {
            eventHandler(payload);
        });
    };
}

let pubsubInstance = new Pubsub();
export default pubsubInstance;