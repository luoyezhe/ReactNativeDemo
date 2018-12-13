import { COLLECT_LIST } from '../ActionTypes';
import { createReducer } from '../';

const initialState = {
    // 收藏列表
    collect: {
        data: [],
        page: 1,
        next: true
    }
};

const actionHandler = {
    [COLLECT_LIST]: (state, action) => {
        console.log('reducer', action.res);
        if (action.page === 1) {
            state.collect.data = [];
        }
        return {
            ...state,
            collect: {
                data: (state.collect.data || []).concat(action.res.results),
                page: action.page,
                next: action.res.next
            }
        };
    }
};

export default createReducer(initialState, actionHandler);
