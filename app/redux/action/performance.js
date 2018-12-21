import {
    PERFORMANCE_LIST,
    PERFORMANCE_DETAIL,
    DYNAMIC_LIST,
    BUSINESS_INFO,
    COLLECT_ORG
} from '../ActionTypes';
import api from '@app/api/performance.js';

export const getPerformanceList = (success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getList()
            .then(res => {
                dispatch({
                    type: PERFORMANCE_LIST,
                    res: res
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};

export const getPerformanceDetail = (id, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getDetail(id)
            .then(res => {
                dispatch({
                    type: PERFORMANCE_DETAIL,
                    res: res
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
// 业绩动态
export const getDynamicList = ({ id, params }, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getDynamicList({ id, params })
            .then(res => {
                dispatch({
                    type: DYNAMIC_LIST,
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
// 工商信息
export const getBusinessInfo = (id, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getBusinessInfo(id)
            .then(res => {
                dispatch({
                    type: BUSINESS_INFO,
                    res: res
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
// 企业收藏
export const collectOrg = (data, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .collectOrg(data)
            .then(res => {
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
// 企业收藏
export const unCollectOrg = (id, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .unCollectOrg(id)
            .then(res => {
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
