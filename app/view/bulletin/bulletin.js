import React from 'react';
import {
    Text,
    View,
    StatusBar,
    Platform,
    InteractionManager
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as bulletinActions from '@app/redux/action/bulletin.js';
import BaseView from '@app/component/BaseView';
import PullListView from '@app/component/common/PullLoadMoreListView';
import BulletinItem from '@app/component/bulletin/listItem';

import { AppStyles } from '@app/style';

// 招标页面
class Bulletin extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
        this.page = 1;
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.renderRow = this.renderRow.bind(this);
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
        console.log('============refresh==============');
        let { bulletinAction } = this.props;
        this.page = 1;
        let params = {
            page: this.page
        };
        bulletinAction.getBulletinList(params, res => {
            console.log('=============refreshComplete=================');
            this.pullList.refreshComplete();
        });
    }
    loadMore() {
        console.log('============loadMore==============');
        let { bulletinAction } = this.props;
        this.page++;
        let params = {
            page: this.page
        };
        bulletinAction.getBulletinList(
            params,
            res => {
                this.pullList.loadMoreComplete();
            },
            error => {
                this.pullList.loadMoreComplete();
            }
        );
    }
    renderRow(rowData) {
        return (
            <BulletinItem
                item={rowData}
                onPressItem={() => {
                    console.log('to detail');
                }}
            />
        );
    }
    render() {
        let { bulletinState } = this.props;
        let dataSource = bulletinState.bulletin_data_list;
        return (
            <View style={AppStyles.mainBox}>
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
                    renderRow={(rowData, index) => this.renderRow(rowData)}
                    refresh={this.refresh}
                    loadMore={this.loadMore}
                    dataSource={dataSource}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        bulletinState: state.bulletin
    }),
    dispatch => ({
        bulletinAction: bindActionCreators(bulletinActions, dispatch)
    })
)(Bulletin);
