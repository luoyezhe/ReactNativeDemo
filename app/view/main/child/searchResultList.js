import React from 'react';
import { Text, View, StatusBar, InteractionManager } from 'react-native';
import { Container, Header, Left, Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import * as mainActions from '@app/redux/action/main.js';
import BaseView from '@app/component/BaseView';
import PullListView from '@app/component/common/PullLoadMoreListView';
import BulletinItem from '@app/component/bulletin/listItem';

import { AppStyles } from '@app/style';

// 招标订阅搜索结果列表页
class SearchResultList extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }
    componentDidMount() {
        console.log('componentDidMount', this.props.searchInput);
        if (!this.props.searchInput) {
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            this.refreshData();
        });
    }
    componentWillReceiveProps(nextProps, nextState) {
        console.log('nextProps', nextProps);
        console.log('props', this.props.searchInput);
        if (
            nextProps.searchInput &&
            nextProps.searchInput !== this.props.searchInput
        ) {
            InteractionManager.runAfterInteractions(() => {
                this.refreshData();
            });
        }
    }
    refreshData() {
        if (this.pullList) {
            this.pullList.showRefreshState();
        }
        this.refresh();
    }
    refresh() {
        console.log('============refresh==============');
        let { mainAction, searchInput } = this.props;
        let params = {
            page: 1,
            keyword_exact__contains: searchInput
        };
        mainAction.getAddSubscriptionSearchList(params, res => {
            console.log('=============refreshComplete=================');
            this.pullList.refreshComplete(this.props.hasNext);
        });
    }
    loadMore() {
        console.log('============loadMore==============');
        let { mainAction, searchInput } = this.props;
        let params = {
            page: this.props.page + 1,
            keyword_exact__contains: searchInput
        };
        mainAction.getAddSubscriptionSearchList(
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
        // let dataSource = this.props.bulletinDate;
        let dataSource = super.getListDataFromSource(
            'main',
            this.props.bulletinDate
        );
        return (
            <Container style={{ flex: 1 }}>
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
            </Container>
        );
    }
}

SearchResultList.propTypes = {
    searchInput: PropTypes.string
};
SearchResultList.defaultProps = {
    searchInput: ''
};

export default connect(
    state => ({
        bulletinDate: state.main.searchList.data,
        page: state.main.searchList.page,
        hasNext: state.main.searchList.next
    }),
    dispatch => ({
        mainAction: bindActionCreators(mainActions, dispatch)
    })
)(SearchResultList);
