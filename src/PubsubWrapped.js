// import pubsub from './pubsub/PubSub';
export default class PubsubWrapped {
    constructor() {
        pubsub.subscribe('shout', this.getData, this);
    }
    data = 'Class ( PubsubWrapped ) property'
    getData = () => {
        console.log('From PubsubWrapped class ( 1 ).', this.data, this);
    }
}

