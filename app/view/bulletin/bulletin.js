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
import { Actions } from 'react-native-router-flux';

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
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }
    componentDidMount() {
        if (this.props.bulletinDate && this.props.bulletinDate.length > 0) {
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
        let { bulletinAction } = this.props;
        let params = {
            page: 1
        };
        bulletinAction.getBulletinList(params, res => {
            console.log('=============refreshComplete=================');
            this.pullList.refreshComplete(this.props.hasNext);
        });
    }
    loadMore() {
        console.log('============loadMore==============');
        let { bulletinAction } = this.props;
        let params = {
            page: this.props.page
        };
        bulletinAction.getBulletinList(
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
        // let dataSource = this.props.bulletinDate;
        let dataSource = super.getListDataFromSource(
            'bulletin',
            this.props.bulletinDate
        );
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
        bulletinDate: state.bulletin.bulletin.data,
        page: state.bulletin.bulletin.page,
        hasNext: state.bulletin.bulletin.next
    }),
    dispatch => ({
        bulletinAction: bindActionCreators(bulletinActions, dispatch)
    })
)(Bulletin);
