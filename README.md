1. Pubsub is a library to achieve communication between two applications using publisher subsciber model.

2. PubsubClass instance (pubsub) is available globally or can be imported from './pubsub/PubSub';

3. Subscribing to an event: 
    Subscribe to an event using 'subscribe' function of the pubsub object.
    @param { string }  event ( Throws a exception if string is blank or undefined. This is a mandatory      parameter ). 
    @param { eventHandler } callback ( Throws a exception if passed anything except a callback. This is a mandatory parameter )
    @param { context } object ( It is an optional parameter. Binds the eventHandler to given context. Arrow functions can't be binded to custom context)
    subscribe(event, eventHandler, context);

4. Unsubscribing to an event:
    Upon successful execution 'subscribe' function returns an object.
    let subscription = subscribe(event, eventHandler, context);
    value of object 'subscription': {unsubscribe: ƒ}
    Invoking subscription.unsubscribe(); successfully removes the associated eventHandler from the subscriber bus.

5. Publishing an event:
    Publish to an event using 'publish' function of the pubsub object.
    @param { event } string ( This is a mandatory parameter. Throws an exception if event is blank or undefined )
    @param { payload } object ( This is an optional parameter. Pass the data to be consumed in the eventHandler )
    pubsub.publish(event, payload);

6. For examples and illustrations, follow the steps below:
    -> clone the repo.
    -> run 'npm install'
    -> run 'npm run dev' and visit http://localhost:8080/. ( './src/index.js' has practical implementations of a few testcases around pubsub model)
    -> for prod build 'npm run prod'. ( production build only converts './pubsub/PubSub' to a transpiled and minified version ready to be consumed in application. )