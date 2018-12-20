import { USER_INFO } from '../ActionTypes';
import { createReducer } from '../';

const initialState = {
    // 用户信息
    userInfo: {}
};

const actionHandler = {
    [USER_INFO]: (state, action) => {
        console.log('reducer', action.res);
        return {
            ...state,
            userInfo: action.res
        };
    }
};

export default createReducer(initialState, actionHandler);
