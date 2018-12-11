import {
    BULLETIN_LIST,
    BULLETIN_COLLECT,
    BULLETIN_UN_COLLECT
} from '../ActionTypes';
import { createReducer } from '../';

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
        console.log('state', state);
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
        // let info_uuid = action.info_uuid;
        // let collect_id = action.res.collect_id;
        // dataSource.updateCollect('bulletin', info_uuid, collect_id, true);
        // console.log('BULLETIN_COLLECT', dataSource);
        return {
            ...state
        };
    },
    [BULLETIN_UN_COLLECT]: (state, action) => {
        // let info_uuid = action.info_uuid;
        // let collect_id = null;
        // dataSource.updateCollect('bulletin', info_uuid, null, false);
        return {
            ...state
        };
    }
};

export default createReducer(initialState, actionHandler);
