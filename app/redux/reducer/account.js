import { handleActions } from 'redux-actions';

import { ACCOUNT_LOGIN } from '../ActionTypes';
import storage from '@app/storage/DeviceStorage.js';

const initialState = {};

const accountReducer = handleActions(
    {
        async [ACCOUNT_LOGIN](state, action) {
            await storage.save('token', action.res);
            return {
                ...state,
                ...action
            };
        }
    },
    initialState
);
export default accountReducer;
