import {
    PERFORMANCE_DETAIL,
    BUSINESS_INFO,
    DYNAMIC_LIST
} from '../ActionTypes';
import { createReducer } from '../';

const initialState = {
    // 企业详情
    detail: {},
    // 业绩动态
    dynamicList: {
        data: [],
        page: 1,
        hasNext: true
    },
    // 工商信息
    businessInfo: {}
};

const actionHandler = {
    [PERFORMANCE_DETAIL]: (state, action) => {
        return {
            ...state,
            detail: action.res
        };
    },
    [DYNAMIC_LIST]: (state, action) => {
        if (action.page === 1) {
            state.dynamicList.data = [];
        }
        return {
            ...state,
            dynamicList: {
                data: (state.dynamicList.data || []).concat(action.res.results),
                page: action.page,
                next: action.res.next
            }
        };
    },
    [BUSINESS_INFO]: (state, action) => {
        return {
            ...state,
            businessInfo: action.res
        };
    }
};

export default createReducer(initialState, actionHandler);
