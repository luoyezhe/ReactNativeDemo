import { BULLETIN_LIST } from '../ActionTypes';
import { createReducer } from '../';

const initialState = {
    // 招标列表
    bulletin_data_list: []
};

const actionHandler = {
    [BULLETIN_LIST]: (state, action) => {
        console.log('reducer', action.res);
        return {
            ...state,
            bulletin_data_list: action.res.results
        };
    }
};

export default createReducer(initialState, actionHandler);
