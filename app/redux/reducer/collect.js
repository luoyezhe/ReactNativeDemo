import { BULLETIN_COLLECT_LIST, ORG_COLLECT_LIST } from '../ActionTypes';
import { createReducer } from '../';

const initialState = {
    // 收藏-项目列表
    bulletinCollect: {
        data: [],
        page: 1,
        next: true
    },
    // 收藏-企业列表
    orgCollect: {
        data: [],
        page: 1,
        next: true
    }
};

const actionHandler = {
    [BULLETIN_COLLECT_LIST]: (state, action) => {
        console.log('reducer', action.res);
        if (action.page === 1) {
            state.bulletinCollect.data = [];
        }
        return {
            ...state,
            bulletinCollect: {
                data: (state.bulletinCollect.data || []).concat(
                    action.res.results
                ),
                page: action.page,
                next: action.res.next
            }
        };
    },
    [ORG_COLLECT_LIST]: (state, action) => {
        console.log('reducer', action.res);
        if (action.page === 1) {
            state.orgCollect.data = [];
        }
        return {
            ...state,
            orgCollect: {
                data: (state.orgCollect.data || []).concat(action.res.results),
                page: action.page,
                next: action.res.next
            }
        };
    }
};

export default createReducer(initialState, actionHandler);
