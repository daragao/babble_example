import 'index.scss'
import 'bootstrap/dist/js/bootstrap.js';
import socket from './socket';

import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App.jsx';
import AppContainer from './containers/ChatApp.jsx';
import * as actions from 'actions'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)

Object.keys(store.getState().nodeClientState.nodes).forEach((nodeName) => {
    socket.on('submitTxResponse@'+nodeName, (msg) => store.dispatch(actions.receivedSubmitTx(nodeName,Object.assign(
        msg,
        {
            method: 'SubmitTxResponse'
        }))));
    socket.on('commitTx@'+nodeName, (msg) => store.dispatch(actions.receivedCommitTx(nodeName,msg)));
});

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
