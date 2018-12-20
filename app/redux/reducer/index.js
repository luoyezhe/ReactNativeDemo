import { combineReducers } from 'redux';
import dataBase from './dataBase';
import account from './account';
import bulletin from './bulletin';
import collect from './collect';
import mine from './mine';
import performance from './performance';

const initReducer = combineReducers({
    dataBase,
    account,
    bulletin,
    collect,
    mine,
    performance
});

export default initReducer;
