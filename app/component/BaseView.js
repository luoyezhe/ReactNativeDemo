import React, { Component, StyleSheet } from 'react';

/*
* 	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
		android: 'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
*  所有页面的基类
* */
import showToast from '@app/utils/toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux/index';

class BaseView extends React.Component {
    constructor(props) {
        super(props);
    }

    updateSourceItem(sourceName, key, childKey, value) {
        let _dataSource = this.props.dataSource[sourceName];
        // dataSource.update(sourceName, key, childKey, value);
        console.log('updateSourceItem', _dataSource);
    }

    getListDataFromSource(sourceName, list) {
        let _dataSource = this.props.dataSource[sourceName];
        console.log('dataSource', _dataSource);
        let arr = list.map(item => {
            return _dataSource[item];
        });
        return arr;
    }

    getSourceItem(sourceName, key, childKey) {
        let _dataSource = this.props.dataSource[sourceName];
        if (_dataSource[key] && childKey) {
            return _dataSource[key][childKey];
        }
        return _dataSource[key] || {};
    }
}

export default connect(
    state => ({
        dataSource: state.dataSource
    }),
    dispatch => ({})
)(BaseView);
