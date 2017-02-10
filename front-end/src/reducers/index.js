import authentication from './authentication';
import memo from './memo';
import search from './search';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
;


import { combineReducers } from 'redux';

export default combineReducers({
    authentication, memo, search,
    routing: routerReducer
});
