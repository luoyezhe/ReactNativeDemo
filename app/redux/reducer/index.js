import { combineReducers } from 'redux';
import account from './account';
import bulletin from './bulletin';

const initReducer = combineReducers({
    account,
    bulletin
});

export default initReducer;
