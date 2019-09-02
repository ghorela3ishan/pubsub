// import pubsub instance from the library ( or use global varibale 'pubsub' available on window )
import instance from './pubsub/PubSub';
import PubsubWrapped from './PubsubWrapped';

// 1 Subsciber wrapped in a class.
let PubsubWrappedInstance = new PubsubWrapped(); 

// 1 Create ordinary subscriber with arrow function. ( arrow functions can't be binded to external context )
// so they always refer to context of their parent scope.
let eventHandler = (data) => {
    console.log('From ordinary arrow function subscriber ( 2 )', data);
}
let ordinary = instance.subscribe('shout', eventHandler);
// ordinary.unsubscribe();

// 2. Create subscriber with inline callback
window.globalVar = 44;
let inline = pubsub.subscribe('shout', function(){
    console.log('From Inline ( 3 ) subsciber', this.globalVar);
});
// inline.unsubscribe();

// 3. Create subscriber with predefined context
let moduleObj = {
    x: 42,
    getX: function() {
        console.log('From predefined context ( 4 ) subsciber', this.x);
    }
}
let moduleEventHandler = moduleObj.getX;
let moduleSubObj = pubsub.subscribe('shout', moduleEventHandler, moduleObj);
// moduleSubObj.unsubscribe();

// 4 passing an invalid eventHandler 
let inValidaHandler = '4';
try {
    let exceptionObj = pubsub.subscribe('', moduleEventHandler);
} catch (e) {
    console.log(e);
}

// publish the event after a delay of 5 seconds
setTimeout(function(){
    pubsub.publish('shout', 'yayy');
}, 5000);
pubsub.subscribe('shout', function() {alert('synced')});

// New event shout2
pubsub.subscribe('shout2', function(){alert(' From shout2 ( 0 )')})
try {
    pubsub.publish('shout2');
} catch (e) {
    console.log(e);
}
