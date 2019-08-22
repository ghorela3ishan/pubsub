import pubsub from './pubsub/PubSub';
export default class PubsubWrapped {
    constructor() {
        this.getData();
        pubsub.subscribe('shout', this.getData, this);
    }
    data = 'Class ( PubsubWrapped ) property'
    getData = () => {
        console.log('From PubsubWrapped class.', this.data, this);
    }
}

