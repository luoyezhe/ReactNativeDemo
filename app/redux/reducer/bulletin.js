import {
    BULLETIN_LIST,
    BULLETIN_COLLECT,
    BULLETIN_UN_COLLECT
} from '../ActionTypes';
import { createReducer } from '../';
import { dataSource } from './dataSource';

const initialState = {
    // 招标列表
    bulletin: {
        data: [],
        page: 1,
        next: true
    }
};

const actionHandler = {
    [BULLETIN_LIST]: (state, action) => {
        console.log('reducer', action.res);
        let _data = action.res.results.map(item => {
            return item.info_uuid;
        });
        if (action.page === 1) {
            state.bulletin.data = [];
        }
        return {
            ...state,
            bulletin: {
                data: (state.bulletin.data || []).concat(_data),
                page: action.page,
                next: action.res.next
            }
        };
    },
    [BULLETIN_COLLECT]: (state, action) => {
        return {
            ...state
        };
    },
    [BULLETIN_UN_COLLECT]: (state, action) => {
        return {
            ...state
        };
    }
};

export default createReducer(initialState, actionHandler);
