import pubsub from './pubsub/PubSub';
import PubsubWrapped from './PubsubWrapped';
window.globalVar = 44;

// 0 Subsciber wrapped in a class.
let PubsubWrappedInstance = new PubsubWrapped(); 

// 1 Create ordinary subscriber with arrow function
let eventHandler = (data) => {
    // gives an error on console statement because this is an arrow function and it doesnt have its own 'this'
    console.log(' From ordinary arrow function subscriber ( 1 )', data);
}
let ordinary = pubsubInstance.subscribe('shout', eventHandler);
// ordinary.unsubscribe();

// 2. Create subscriber with inline callback
let inline = pubsubInstance.subscribe('shout', function(){
    console.log('From Inline ( 2 ) subsciber', this.globalVar);
});
// inline.unsubscribe();

// 3. Create subscriber with predefined context
let moduleObj = {
    x: 42,
    getX: function() {
        console.log('From predefined context ( 3 ) subsciber', this.x);
    }
}
let moduleEventHandler = moduleObj.getX;
let moduleSubObj = pubsubInstance.subscribe('shout', moduleEventHandler, moduleObj);
// moduleSubObj.unsubscribe();

// 4 passing an invalid eventHandler 
let inValidaHandler = '4';
try {
    let exceptionObj = pubsubInstance.subscribe('shout', inValidaHandler);
} catch (e) {
    console.log(e);
}

// publish the event after a delay of 3 seconds
setTimeout(function(){
    pubsubInstance.publish('shout', 'yayy');
}, 5000);
pubsubInstance.subscribe('shout', function() {alert('synced')});
pubsubInstance.subscribe('shout2', function(){alert(' From shout2 ( 0 )')})
pubsubInstance.publish('shout2');
