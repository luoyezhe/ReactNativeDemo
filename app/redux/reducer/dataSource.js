import {
    ADD_DATASOURCE,
    UPDATE_DATASOURCE,
    DELETE_DATASOURCE
} from '../ActionTypes';
import { createReducer } from '../';

const initialState = {
    // 数据源
    dataSource: {}
};

const actionHandler = {
    /*
     * action.module: 模块名称
     * action.key: 数据key
     * action.value: 值
     * */
    [ADD_DATASOURCE]: (state, action) => {
        if (action.key && action.value) {
            if (!state.dataSource[action.module]) {
                state.dataSource[action.module] = {};
            }
            if (Array.isArray(action.value)) {
                action.value.forEach(item => {
                    let _key = item[action.key];
                    state.dataSource[action.module][_key] = item;
                });
            } else {
                let _key = action.value[action.key];
                state.dataSource[action.module][_key] = action.value;
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state.dataSource[_module]
        };
    },
    /*
     * action.module: 修改哪个模块的数据
     * action.key: 修改的值的key
     * action.childKey: 修改的值的具体key
     * action.value: 修改后的值
     * */
    [UPDATE_DATASOURCE]: (state, action) => {
        if (action.module && action.value) {
            if (action.key && action.childKey) {
                if (state.dataSource[action.module][action.key]) {
                    state.dataSource[action.module][action.key][
                        action.childKey
                    ] = action.value;
                }
            } else {
                state.dataSource[action.module][action.key] = action.value;
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state.dataSource[_module]
        };
    },
    /*
     * action.module: 修改哪个模块的数据
     * action.key: 删除哪个值
     * action.deleteAll: 删除整个模块
     * */
    [DELETE_DATASOURCE]: (state, action) => {
        if (action.module) {
            if (action.deleteAll) {
                delete state.dataSource[action.module];
            } else {
                delete state.dataSource[action.module][action.key];
            }
        }
        let _module = action.module;
        return {
            ...state,
            [_module]: state.dataSource[_module]
        };
    }
};

export default createReducer(initialState, actionHandler);

// let _dataSource;
// class DataSource {
//     constructor() {
//         this.sourceAll = {};
//     }
//
//     push(sourceName, key, value) {
//         if (!this.sourceAll[sourceName]) {
//             this.sourceAll[sourceName] = {};
//         }
//         if (Array.isArray(value)) {
//             value.forEach(item => {
//                 this.push(sourceName, item[key], item);
//             });
//         } else {
//             this.sourceAll[sourceName][key] = value;
//         }
//     }
//
//     /*
//      * sourceName: 数据源的名字
//      * key: 存的key
//      * childKey: 子key
//      * value: 值
//      * */
//     update(sourceName, key, childKey, value) {
//         if (!this.sourceAll[sourceName]) {
//             this.sourceAll[sourceName] = {};
//         }
//         if (childKey) {
//             if (!this.sourceAll[sourceName][key]) {
//                 this.sourceAll[sourceName][key] = {};
//             }
//             this.sourceAll[sourceName][key][childKey] = value;
//         } else {
//             this.sourceAll[sourceName][key] = value;
//         }
//     }
//
//     // 标讯收藏这种特殊的更新
//     updateCollect(sourceName, key, value, isCollect) {
//         if (!this.sourceAll[sourceName]) {
//             this.sourceAll[sourceName] = {};
//         }
//         if (!this.sourceAll[sourceName].detail) {
//             this.sourceAll[sourceName].detail = {};
//         }
//         this.sourceAll[sourceName][key].is_collect = isCollect;
//         this.sourceAll[sourceName][key].detail.collect_id = value;
//     }
// }
//
// const initDataSource = () => {
//     if (!_dataSource) {
//         _dataSource = new DataSource();
//     }
// };
//
// initDataSource();
//
// export { _dataSource as dataSource };
