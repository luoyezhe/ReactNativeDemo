import { ACCOUNT_LOGIN, ACCOUNT_REGISTER } from '../ActionTypes';
import storage from '@app/storage/DeviceStorage.js';
import { createReducer } from '../index';

const initialState = {};

const actionHandler = {
    async [ACCOUNT_LOGIN](state, action) {
        await storage.save('token', action.res);
        return {
            ...state,
            ...action
        };
    },
    async [ACCOUNT_REGISTER](state, action) {
        await storage.save('token', action.res);
        return {
            ...state,
            ...action
        };
    }
};

export default createReducer(initialState, actionHandler);
