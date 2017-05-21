import 'index.scss'
import 'bootstrap/dist/js/bootstrap.js';
import io from 'socket.io-client';

import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App.jsx';
import AppContainer from './containers/ChatApp.jsx';
import * as actions from 'actions'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)

const wsPort = 3000;
const wsURL = 'http://localhost:'+wsPort;
var socket = io(wsURL);
//submit --> socket.emit('submitTx@'+nodeName, $('#m').val());
Object.keys(store.getState().nodeClientState.nodes).forEach((nodeName) => {
    socket.on('submitTxResponse@'+nodeName, (msg) => store.dispatch(actions.receivedSubmitTx(node,msg)));
    socket.on('commitTx@'+nodeName, (msg) => store.dispatch(actions.receivedCommitTx(node,msg)));
});

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
