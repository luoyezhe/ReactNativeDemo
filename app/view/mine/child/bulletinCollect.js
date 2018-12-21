import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
    StatusBar,
    InteractionManager
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as collectActions from '@app/redux/action/collect.js';
import PullListView from '@app/component/common/PullLoadMoreListView';
import BulletinItem from '@app/component/bulletin/listItem';

class BulletinCollect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        if (this.props.collectData && this.props.collectData.length > 0) {
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
        console.log('============refresh==============');
        let { collectAction } = this.props;
        let params = {
            page: 1
        };
        collectAction.getBulletinCollectList(params, res => {
            console.log('=============refreshComplete=================');
            this.pullList.refreshComplete(this.props.hasNext);
        });
    }
    loadMore() {
        console.log('============loadMore==============');
        let { collectAction } = this.props;
        let params = {
            page: this.props.page + 1
        };
        collectAction.getBulletinCollectList(
            params,
            res => {
                this.pullList.loadMoreComplete(this.props.hasNext);
            },
            error => {
                this.pullList.loadMoreComplete(this.props.hasNext);
            }
        );
    }
    renderRow(rowData) {
        console.log('rowData', rowData);
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
        let dataSource = this.props.collectData;
        console.log('dataSource', dataSource);
        return (
            <View style={{ backgroundColor: '#ccc', flex: 1 }}>
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
        collectData: state.collect.bulletinCollect.data,
        page: state.collect.bulletinCollect.page,
        hasNext: state.collect.bulletinCollect.next
    }),
    dispatch => ({
        collectAction: bindActionCreators(collectActions, dispatch)
    })
)(BulletinCollect);

const styles = StyleSheet.create({
    colItem: {
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'center',
        marginTop: 15
    }
});
