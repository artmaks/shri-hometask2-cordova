import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Provider } from 'react-redux';
import Store from './store';

const StoreInstance = Store();

import App from './App';

ReactDOM.render(
    <Provider store={StoreInstance}>
        <App />
    </Provider>,
    document.getElementById('app')
);
