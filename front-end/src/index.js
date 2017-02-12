import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import thunk from 'redux-thunk'
import Root from './containers/Root';
import { createStore, applyMiddleware } from "redux";
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
        <Root store={store} history={history}/>
    </AppContainer>, document.getElementById('root')
);

if (module.hot) {
    console.log('*****************************111');
    module.hot.accept('./containers/Root', () => {
        console.log('*****************************222');
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
