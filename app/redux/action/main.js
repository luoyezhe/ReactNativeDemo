import api from '@app/api/bulletin';
import {
    ADD_SUBSCRIPTION_BULLETIN_LIST,
    INIT_ADD_SUBSCRIPTION_BULLETIN_LIST,
    ADD_RULE,
    RULES_LIST,
    ADD_DATABASE
} from '../ActionTypes';

export const initAddSubscriptionSearchList = async () => {
    (dispatch, getState) => {
        dispatch({
            type: INIT_ADD_SUBSCRIPTION_BULLETIN_LIST
        });
    };
};

export const getAddSubscriptionSearchList = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getList(params)
            .then(res => {
                dispatch({
                    type: ADD_DATABASE,
                    module: 'main',
                    key: 'info_uuid',
                    value: res.results
                });
                dispatch({
                    type: ADD_SUBSCRIPTION_BULLETIN_LIST,
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

export const addRule = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .addRule(params)
            .then(res => {
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
export const getRules = (params, success, fail) => {
    return async (dispatch, getState) => {
        return await api
            .getRules(params)
            .then(res => {
                dispatch({
                    type: RULES_LIST,
                    res: res
                });
                success && success(res);
            })
            .cache(error => {
                fail && fail(error);
            });
    };
};
