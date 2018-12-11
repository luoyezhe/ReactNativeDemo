import { combineReducers } from 'redux';
// import account from './account';
import bulletin from './bulletin';
import dataSource from './dataSource';

const initReducer = combineReducers({
    // account,
    bulletin,
    dataSource
});

export default initReducer;
