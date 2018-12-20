import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    InteractionManager,
    StatusBar,
    StyleSheet
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as performanceActions from '@app/redux/action/performance.js';
import BulletinItem from '@app/component/bulletin/listItem.js';
import PullListView from '@app/component/common/PullLoadMoreListView';
import Toast from '@app/component/common/toast.js';

class DynamicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.renderRow = this.renderRow.bind(this);
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }
    componentDidMount() {
        if (this.props.dataSource && this.props.dataSource.length > 0) {
            return;
        }
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
        let { performanceAction, id } = this.props;
        let params = {
            page: 1
        };
        performanceAction.getDynamicList(
            { id, params },
            () => {
                this.pullList.refreshComplete(false);
            },
            error => {
                this.pullList.refreshComplete(false);
                Toast.showToast(error.data.message);
            }
        );
    }
    loadMore() {
        console.log('============loadMore==============');
        let { performanceAction, id } = this.props;
        let params = {
            page: this.props.page + 1
        };
        performanceAction.getDynamicList(
            {
                id,
                params
            },
            res => {
                this.pullList.loadMoreComplete(this.props.hasNext);
            },
            error => {
                this.pullList.loadMoreComplete(this.props.hasNext);
            }
        );
    }

    renderRow(rowData) {
        // console.log('rowData', rowData.title);
        return (
            <BulletinItem
                item={rowData}
                onPressItem={() => {
                    console.log('to detail');
                    Actions.bulletinDetail({ id: rowData.info_uuid });
                }}
            />
        );
    }

    render() {
        let { dataSource } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent
                    barStyle={'light-content'}
                />
                <PullListView
                    style={{ flex: 1 }}
                    ref={ref => {
                        this.pullList = ref;
                    }}
                    renderItem={(rowData, index) => this.renderRow(rowData)}
                    refresh={this.refresh}
                    loadMore={this.loadMore}
                    data={dataSource}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        dataSource: state.performance.dynamicList.data,
        page: state.performance.dynamicList.page,
        hasNext: state.performance.dynamicList.next
    }),
    dispatch => ({
        performanceAction: bindActionCreators(performanceActions, dispatch)
    })
)(DynamicList);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold'
    }
});
