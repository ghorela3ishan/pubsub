class Pubsub {
    subscriptions = {};

    subscribe = (event, eventHandler, context) => {
            eventHandler.bind(context);
            if(!this.subscriptions[event]) {
                this.subscriptions[event] = [];
            }
            let position = this.subscriptions[event].push(eventHandler);
            let index = position - 1;
            return({
                unsubscribe: () => {
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

let instance = new Pubsub();
export default instance;