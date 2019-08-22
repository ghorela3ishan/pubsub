import pubsub from './pubsub/PubSub';
import PubsubWrapped from './PubsubWrapped';

let PubsubWrappedInstance = new PubsubWrapped(); 
window.globalVar = 44;
// subsciber to event 'shout'
// 1 Create ordinary subscriber with arrow function
let eventHandler = (data) => {
    // gives an error on console statement because this is an arrow function and it doesnt have its own 'this'
    // console.log('From Ordinary ( 1 ) subsciber', this.globalVar)
    alert('shout ' + data);
}
let ordinary = pubsub.subscribe('shout', eventHandler);
ordinary.unsubscribe();

// 2. Create subscriber with inline callback
let inline = pubsub.subscribe('shout', function(){
    console.log('From Inline ( 2 ) subsciber', this.globalVar);
});
inline.unsubscribe();

// 3. Create subscriber with predefined context
let moduleObj = {
    x: 42,
    getX: function() {
        console.log('From predefined context ( 3 ) subsciber', this.x);
    }
}
let moduleEventHandler = moduleObj.getX;
let moduleSubObj = pubsub.subscribe('shout', moduleEventHandler, moduleObj);
moduleSubObj.unsubscribe();


// publish the event after a delay of 3 seconds
setTimeout(function(){
    pubsub.publish('shout', 'yayy');
}, 3000);

