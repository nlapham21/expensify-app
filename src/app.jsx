import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/initialize'; // needed to use react-dates
import 'react-dates/lib/css/_datepicker.css';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';

import 'normalize.css/normalize.css'; // normalizes browser settings
import './styles/styles.scss';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendererd = false;
const renderApp = () => {
    if (!hasRendererd) {
        hasRendererd = true;
        ReactDOM.render(jsx, document.getElementById('app'));
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
