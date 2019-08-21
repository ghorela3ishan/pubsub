import pubsub from './pubsub/PubSub';

// let obj = new Pubsub();
let eventHandler = (data) => {
    alert('shout ' + data);
}

pubsub.subscribe('shout',eventHandler);

setTimeout(function(){
    pubsub.publish('shout', 'yayy')
}, 5000);