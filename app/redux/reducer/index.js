import { combineReducers } from 'redux';
import dataBase from './dataBase';
import account from './account';
import bulletin from './bulletin';
import collect from './collect';

const initReducer = combineReducers({
    dataBase,
    account,
    bulletin,
    collect
});

export default initReducer;
