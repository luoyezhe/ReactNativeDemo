import { BULLETIN_COLLECT_LIST, ORG_COLLECT_LIST } from '../ActionTypes';
import api from '@app/api/collect';

// 收藏-我的项目
export const getBulletinCollectList = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getBulletinCollectList(params)
            .then(res => {
                dispatch({
                    type: BULLETIN_COLLECT_LIST,
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
// 收藏-我的企业
export const getOrgCollectList = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getOrgCollectList(params)
            .then(res => {
                dispatch({
                    type: ORG_COLLECT_LIST,
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
