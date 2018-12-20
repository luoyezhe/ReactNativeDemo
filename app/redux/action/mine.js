import { USER_INFO } from '../ActionTypes';
import api from '@app/api/mine';

export const getUserInfo = (success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getUserInfo()
            .then(res => {
                dispatch({
                    type: USER_INFO,
                    res: res
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
