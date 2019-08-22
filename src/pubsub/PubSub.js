class Pubsub {
    subscriptions = {};

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

    publish = (event, payload) => {
        if(!this.subscriptions[event]) return;
        this.subscriptions[event].forEach(eventHandler => {
            eventHandler(payload);
        });
    };
}

let pubsubInstance = new Pubsub();
export default pubsubInstance;