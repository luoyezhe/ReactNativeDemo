import {
    ADD_DATABASE,
    UPDATE_DATABASE,
    DELETE_DATABASE,
    UPDATE_DATABASE_COLLECT
} from '../ActionTypes';

import { createReducer } from '../';

const initialState = {};

const actionHandler = {
    /*
     * action.module: 模块名称
     * action.key: 数据key
     * action.value: 值
     * */
    [ADD_DATABASE]: (state, action) => {
        console.log('ADD_DATABASE', state);
        if (action.key && action.value) {
            if (!state[action.module]) {
                state[action.module] = {};
            }
            if (Array.isArray(action.value)) {
                action.value.forEach(item => {
                    let _key = item[action.key];
                    state[action.module][_key] = item;
                });
            } else {
                let _key = action.value[action.key];
                state[action.module][_key] = action.value;
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state[_module]
        };
    },
    /*
     * action.module: 修改哪个模块的数据
     * action.key: 修改的值的key
     * action.childKey: 修改的值的具体key
     * action.value: 修改后的值
     * */
    [UPDATE_DATABASE]: (state, action) => {
        console.log('UPDATE_DATABASE', state);
        if (action.module && action.value) {
            if (action.key && action.childKey) {
                if (state[action.module][action.key]) {
                    state[action.module][action.key][action.childKey] =
                        action.value;
                }
            } else {
                state[action.module][action.key] = action.value;
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state[_module]
        };
    },
    /*
     * action.module: 修改哪个模块的数据
     * action.key: 修改的值的key
     * action.childKey: 修改的值的具体key
     * action.value: 修改后的值
     * */
    [UPDATE_DATABASE]: (state, action) => {
        console.log('UPDATE_DATABASE', state);
        if (action.module && action.value) {
            if (action.key && action.childKey) {
                if (state[action.module][action.key]) {
                    state[action.module][action.key][action.childKey] =
                        action.value;
                }
            } else {
                state[action.module][action.key] = action.value;
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state[_module]
        };
    },
    /*
     * action.module: 修改哪个模块的数据
     * action.key: 修改的值的key
     * action.childKey: 修改的值的具体key
     * action.value: 修改后的值
     * */
    [UPDATE_DATABASE_COLLECT]: (state, action) => {
        console.log('UPDATE_DATABASE_COLLECT', state);
        if (action.module && action.key) {
            if (state[action.module][action.key]) {
                state[action.module][action.key].is_collect = !!action.value;
                if (state[action.module][action.key].detail) {
                    state[action.module][action.key].detail[action.childKey] =
                        action.value;
                }
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state[_module]
        };
    },
    /*
     * action.module: 修改哪个模块的数据
     * action.key: 删除哪个值
     * action.deleteAll: 删除整个模块
     * */
    [DELETE_DATABASE]: (state, action) => {
        if (action.module) {
            if (action.deleteAll) {
                delete state[action.module];
            } else {
                delete state[action.module][action.key];
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state[_module]
        };
    }
};

export default createReducer(initialState, actionHandler);
