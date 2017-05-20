import 'index.scss'
import 'bootstrap/dist/js/bootstrap.js';

import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App.jsx';
import AppContainer from './containers/ChatApp.jsx';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
