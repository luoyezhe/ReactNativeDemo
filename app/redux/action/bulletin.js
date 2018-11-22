import api from '@app/api/bulletin';
import {
    BULLETIN_LIST,
    BULLETIN_COLLECT,
    BULLETIN_UN_COLLECT
} from '../ActionTypes';

export const getBulletinList = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getList(params)
            .then(res => {
                dispatch({
                    type: BULLETIN_LIST,
                    res: res,
                    page: params.page + 1
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};

export const bulletinCollect = (data, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .bulletinCollect(data)
            .then(res => {
                dispatch({
                    type: BULLETIN_COLLECT,
                    res: res,
                    info_uuid: data.info_uuid
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};

export const bulletinUnCollect = ({ id, info_uuid }, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .bulletinUnCollect(id)
            .then(res => {
                dispatch({
                    type: BULLETIN_UN_COLLECT,
                    res: res,
                    info_uuid: info_uuid
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
