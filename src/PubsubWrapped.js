// import pubsub from './pubsub/PubSub';
export default class PubsubWrapped {
    constructor() {
        pubsubInstance.subscribe('shout', this.getData, this);
    }
    data = 'Class ( PubsubWrapped ) property'
    getData = () => {
        console.log('From PubsubWrapped class ( 0 ).', this.data, this);
    }
}

