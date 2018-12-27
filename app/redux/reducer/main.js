import {
    ADD_SUBSCRIPTION_BULLETIN_LIST,
    INIT_ADD_SUBSCRIPTION_BULLETIN_LIST,
    RULES_LIST
} from '../ActionTypes';
import { createReducer } from '../';

const initialState = {
    // 招标列表
    searchList: {
        data: [],
        page: 1,
        count: 0,
        next: true
    },
    rules: []
};

const actionHandler = {
    [INIT_ADD_SUBSCRIPTION_BULLETIN_LIST]: (state, action) => {
        return {
            ...state,
            searchList: {
                data: [],
                page: 1,
                count: 0,
                next: true
            }
        };
    },
    [ADD_SUBSCRIPTION_BULLETIN_LIST]: (state, action) => {
        console.log('reducer', action.res);
        let _data = action.res.results.map(item => {
            return item.info_uuid;
        });
        if (action.page === 1) {
            state.searchList.data = [];
        }
        return {
            ...state,
            searchList: {
                data: (state.searchList.data || []).concat(_data),
                page: action.page,
                count: action.res.count,
                next: action.res.next
            }
        };
    },
    [RULES_LIST]: (state, action) => {
        console.log('reducer', action.res);
        return {
            ...state,
            rules: action.res.results
        };
    }
};

export default createReducer(initialState, actionHandler);
