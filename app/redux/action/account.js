import { ACCOUNT_LOGIN, ACCOUNT_REGISTER } from '../ActionTypes';
import api from '../../api/account';
import { postFetch } from '../../api/BaseRequest';
import storage from '@app/storage/DeviceStorage.js';

export const login = (data, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .login(data)
            .then(res => {
                storage.save('token', res.token);
                // dispatch({
                //     type: ACCOUNT_LOGIN,
                //     res: res
                // });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
export const register = (data, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .register(data)
            .then(res => {
                storage.save('token', res.token);
                // dispatch({
                //     type: ACCOUNT_REGISTER,
                //     res: res
                // });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
export const getCaptcha = (data, success, fail) => {
    return async (dispatch, getState) => {
        // postFetch('/v1/api/captchas/send/', data)
        //     .then(json => {
        //         console.log('json', json);
        //     })
        //     .catch(error => {
        //         console.log('error', error);
        //     });
        return await api
            .getCaptcha(data)
            .then(res => {
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
