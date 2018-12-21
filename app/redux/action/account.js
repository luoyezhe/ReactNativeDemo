import { ACCOUNT_LOGIN, ADD_DATABASE } from '../ActionTypes';
import api from '@app/api/account.js';

export const login = (data, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .login(data)
            .then(res => {
                dispatch({
                    type: ACCOUNT_LOGIN,
                    res: res
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
