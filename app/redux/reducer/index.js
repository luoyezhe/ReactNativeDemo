import { combineReducers } from 'redux';
import account from './account';
import bulletin from './bulletin';
import dataBase from './dataBase';

const initReducer = combineReducers({
    account,
    bulletin,
    dataBase
});

export default initReducer;
