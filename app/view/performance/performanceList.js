import React, { Component } from 'react';
import {
    View,
    Text,
    InteractionManager,
    StatusBar,
    StyleSheet
} from 'react-native';

import { Spinner } from 'native-base';

import { Actions } from 'react-native-router-flux';
// import { BulletinItem, Toast } from '@app/component';
import ListItem from './child/listItem';
import PullListView from '@app/component/common/PullLoadMoreListView';
import Toast from '@app/component/common/toast.js';

import api from '@app/api/performance';

// 企业业绩查询-列表
export default class PerformanceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.renderRow = this.renderRow.bind(this);
        this.refresh = this.refresh.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.refreshData();
        });
    }
    refreshData() {
        if (this.pullList) {
            this.pullList.showRefreshState();
        }
        this.refresh();
    }
    refresh() {
        api.getList()
            .then(res => {
                this.pullList.refreshComplete(false);
                this.setState({
                    list: res
                });
            })
            .catch(error => {
                Toast.showToast(error.data.message);
            });
    }

    renderRow(rowData) {
        // console.log('rowData', rowData.title);
        return (
            <ListItem
                item={rowData}
                onPressItem={() => {
                    console.log('to detail');
                    Actions.performanceDetail({ id: rowData.org_uuid });
                }}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent
                    barStyle={'light-content'}
                />
                <Text style={styles.header}>热门企业</Text>
                <PullListView
                    style={{ flex: 1 }}
                    ref={ref => {
                        this.pullList = ref;
                    }}
                    renderItem={(rowData, index) => this.renderRow(rowData)}
                    refresh={this.refresh}
                    data={this.state.list}
                    showListFooter={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold'
    }
});
