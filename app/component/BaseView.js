import React, { Component, StyleSheet } from 'react';

/*
* 	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
		android: 'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
*  所有页面的基类
* */
import showToast from '@app/component/common/toast';
import { dataSource } from '@app/redux/reducer/dataSource';
import store from '@app/redux/index.js';

export default class BaseView extends React.Component {
    constructor(props) {
        super(props);
    }

    updateSourceItem(sourceName, key, childKey, value) {
        // const state = store.getState();
        // dataSource.update(sourceName, key, childKey, value);
        // console.log('updateSourceItem', dataSource);
    }

    getListDataFromSource(module, list) {
        const state = store.getState();
        console.log('getListDataFromSource', state);
        let arr = list.map(item => {
            return state.dataBase[module][item];
        });
        return arr;
    }

    getSourceItem(module, key, childKey) {
        const state = store.getState();
        console.log('getSourceItem', state);
        if (state.dataBase[module][key] && childKey) {
            return state.dataBase[module][key][childKey];
        }
        return state.dataBase[module][key] || {};
    }
}
