import React, { Component, StyleSheet } from 'react';

/*
* 	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
		android: 'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
*  所有页面的基类
* */
import showToast from '@app/utils/toast';
import { dataSource } from '@app/redux/reducer/dataSource';

export default class BaseView extends React.Component {
    constructor(props) {
        super(props);
    }

    updateSourceItem(sourceName, key, childKey, value) {
        dataSource.update(sourceName, key, childKey, value);
        console.log('updateSourceItem', dataSource);
    }

    getListDataFromSource(sourceName, list) {
        console.log('dataSource', dataSource);
        let arr = list.map(item => {
            return dataSource.sourceAll[sourceName][item];
        });
        return arr;
    }

    getSourceItem(sourceName, key, childKey) {
        if (!dataSource.sourceAll[sourceName][key]) {
            dataSource.sourceAll[sourceName][key] = {};
        }
        if (childKey) {
            return dataSource.sourceAll[sourceName][key][childKey];
        }
        return dataSource.sourceAll[sourceName][key];
    }
}
