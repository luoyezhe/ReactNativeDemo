import { handleActions } from 'redux-actions';

import { ACCOUNT_LOGIN } from '../ActionTypes';

const initialState = {};

const accountReducer = handleActions(
    {
        [ACCOUNT_LOGIN](state, action) {
            return {
                ...state,
                ...action
            };
        }
    },
    initialState
);
export default accountReducer;
