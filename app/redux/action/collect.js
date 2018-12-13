import { COLLECT_LIST } from '../ActionTypes';
import api from '@app/api/collect';

export const getCollectList = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getCollectList(params)
            .then(res => {
                dispatch({
                    type: COLLECT_LIST,
                    res: res,
                    page: params.page
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
