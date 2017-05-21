const initialState = {
    nodes: {
        'node1': {
            'submitTxResponseChannels': 'submitTxResponse@node1',
            'submitTxChannels': 'submitTx@node1',
            'commitTxChannels': 'commitTx@node1'
        },
        'node2': {
            'submitTxResponseChannels': 'submitTxResponse@node2',
            'submitTxChannels': 'submitTx@node2',
            'commitTxChannels': 'commitTx@node2'
        },
        'node3': {
            'submitTxResponseChannels': 'submitTxResponse@node3',
            'submitTxChannels': 'submitTx@node3',
            'commitTxChannels': 'commitTx@node3'
        },
        'node4': {
            'submitTxResponseChannels': 'submitTxResponse@node4',
            'submitTxChannels': 'submitTx@node4',
            'commitTxChannels': 'commitTx@node4'
        }
    },
    messages: [
        {"node":"node1","msg":"hi","time":1495294649827},
        {"node":"node2","msg":"by","time":1495294650915},
        {"node":"node3","msg":"ciao","time":1495294653665},
        {"node":"node4","msg":"yo","time":1495294656161},
        {"node":"node4","msg":"yo","time":1495294656161},
        {"node":"node4","msg":"yo","time":1495294656161},
        {"node":"node4","msg":"yo","time":1495294656161},
        {"node":"node4","msg":"yo","time":1495294656161},
        {"node":"node4","msg":"yo","time":1495294656161},
    ]
};

// should use Immutable
// https://facebook.github.io/immutable-js/

const nodeClientState = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH':
            console.log('REFRESHING!!!');
            return Object.assign({},state);
        case 'SEND_SUBMIT_TX':
        case 'RECEIVE_SUBMIT_TX':
        case 'RECEIVE_COMMIT_TX':
            state.messages = state.messages.concat(action.data);
            console.log('REDUCER:',JSON.stringify(action,undefined,' '));
            return Object.assign({},state);
        default:
            return state;
    }
};

export default nodeClientState;
