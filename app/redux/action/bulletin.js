import api from '@app/api/bulletin';
import {
    BULLETIN_LIST,
    ADD_DATABASE,
    UPDATE_DATABASE,
    UPDATE_DATABASE_COLLECT
} from '../ActionTypes';

export const getBulletinList = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getList(params)
            .then(res => {
                dispatch({
                    type: ADD_DATABASE,
                    module: 'bulletin',
                    key: 'info_uuid',
                    value: res.results
                });
                dispatch({
                    type: BULLETIN_LIST,
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

export const getBulletinDetail = (id, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getDetail(id)
            .then(res => {
                // dispatch({
                //     type: UPDATE_DATABASE,
                //     module: 'bulletin',
                //     key: id,
                //     childKey: 'detail',
                //     value: res
                // });
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
                    type: UPDATE_DATABASE_COLLECT,
                    module: 'bulletin',
                    key: data.info_uuid,
                    childKey: 'collect_id',
                    value: res.collect_id
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
                    type: UPDATE_DATABASE_COLLECT,
                    module: 'bulletin',
                    key: info_uuid,
                    childKey: 'collect_id',
                    value: null
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
