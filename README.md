## Pubsub.js
 Pubsub is a lightweight library that helps achieve communication between two applications using          publisher subsciber model. Internally it maintains an object 'subscriptions' to store key value pairs    of event and their corresponding handlers. (key is used to store the name of the event and it's value    is another object which in turn manages key value pairs of randomly time stamped generated keys and      subsciber handler of the events.)

## Pubsub.js global instance
 PubsubClass instance ( 'pubsub' ) is available globally or can be imported from './pubsub/PubSub', 
 however it is ensured that even in the case when there are multiple imports on the same page, only one common instance is managed. Hence the instance is singleton in nature;

## Implementation
1. Subscribing to an event:
    1. Subscribe to an event using 'subscribe' function of the pubsub object.
    2. @param { string }  event ( Throws an exception if string is blank or undefined. This is a
    mandatory parameter ). 
    3. @param { eventHandler } callback ( Throws a exception if passed anything except a callback. This
    is a mandatory parameter )
    4. @param { context } object ( It is an optional parameter. Binds the eventHandler to given context. Arrow functions can't be binded to custom context).
        ```javascript
        subscribe(event, eventHandler, context);
        ``` 
    5. Example to subscribe to an event:
        ```javascript
        var clickHandler = function(payload) {
            console.log('inside clickHandler of buttonClicked event', payload); 
            // payload is the data sent by publisher.
        }
        var clickSubscriber = pubsub.subscribe('buttonClicked', clickHandler, this);

2. Unsubscribing to an event:
    1. Upon successful execution 'subscribe' function returns an object.
        ```javascript
        var clickSubscriber = pubsub.subscribe('buttonClicked', clickHandler, this);
        ```
    2. value of object 'clickSubscriber': 
        ```javascript
        { unsubscribe: ƒ }
        ```
    3. Invoking 
        ```javascript
        clickSubscriber.unsubscribe();
        ``` 
        successfully removes the associated eventHandler ( clickHandler ) from the subscriber bus.

3. Publishing an event:
    1. Publish to an event using 'publish' function of the pubsub object.
    2. @param { event } string ( This is a mandatory parameter. Throws an exception if event is blank or undefined )
    3. @param { payload } object ( This is an optional parameter. Pass the data to be consumed in the eventHandler )
        ```javascript
        pubsub.publish(event, payload);
        ````
    5. Example to publish an event:
        ```javascript
        pubsub.publish('buttonClicked', { source: 'resdex', appId: '112'});
        ```

# Precautions to be kept:
    1. Always remember to clear ( unsubcribe ) the subscriber using the subsciption instance when the 
    subscriber is no longer required. 
    2. Avoid copies of subscription.

# For examples and illustrations, follow the steps below:
    1. Clone the repo.
    2. Run 'npm install'
    3. Run 'npm run dev' and visit http://localhost:8080/. ( './src/index.js' has practical implementations of a few testcases around publisher subcriber model.)
    4. For production ready build run: 'npm run prod'. ( production build only converts './pubsub/PubSub' to a transpiled and minified version ready to be consumed in application. ). Build is created in 'dist' folder at root level.