import api from '@app/api/bulletin';
import { BULLETIN_LIST } from '../ActionTypes';

export const getBulletinList = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getList(params)
            .then(res => {
                dispatch({
                    type: BULLETIN_LIST,
                    res: res
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
