import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import { AppStyles, AppColors, AppSizes, AppFonts } from '@app/style';
import { PAGE_SIZE } from '@app/config';

/**
 * 上下拉列表控件
 */
class PullLoadMoreListView extends React.Component {
    constructor(props) {
        super(props);
        this.renderFooter = this.renderFooter.bind(this);
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.renderEmpty = this.renderEmpty.bind(this);
        //设置state
        this.state = {
            isRefresh: false,
            isRefreshing: false,
            showLoadMore: false,
            showRefresh: true,
            listHeight: 0
        };
    }

    /**
     * 绘制load more footer
     * */
    renderFooter() {
        if (!this.props.showListFooter) {
            return <View />;
        }
        let footer = this.state.showLoadMore ? (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <ActivityIndicator
                    color={AppColors.primaryColor}
                    animating={true}
                    style={{ height: 50 }}
                    size="large"
                />
                <Text style={{ fontSize: 15, color: 'black' }}>
                    loadMoreing
                </Text>
            </View>
        ) : (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text
                    style={{
                        fontSize: 15,
                        color: 'black',
                        margin: AppSizes.normalMarginEdge
                    }}>
                    {this.props.data.length > 0 ? 'loadMoreEnd' : ' '}
                </Text>
            </View>
        );

        return footer;
    }

    /**
     * 刷新
     * */
    refresh() {
        console.log('=========pullRefresh===========');
        if (this.state.isRefreshing) {
            return;
        }
        this.setState({
            isRefreshing: true,
            showLoadMore: false,
            isRefresh: true
        });
        this.props.refresh && this.props.refresh();
    }

    /**
     * 加载更多
     * */
    loadMore() {
        console.log('=========pullLoadMore===========');
        if (this.state.isRefreshing) {
            return;
        }
        if (!this.state.showLoadMore) {
            return;
        }
        if (this.props.data.length === 0) {
            return;
        }
        this.setState({
            isRefreshing: true,
            showRefresh: false
        });
        this.props.loadMore && this.props.loadMore();
    }

    renderEmpty() {
        return !this.props.hasOwnProperty('renderHeader') ? (
            <View
                style={[
                    AppStyles.centered,
                    {
                        flex: 1,
                        height: this.state.listHeight
                    }
                ]}>
                <TouchableOpacity
                    style={[AppStyles.centered, { flex: 1 }]}
                    onPress={() => {
                        this.refresh();
                        this.showRefreshState();
                    }}>
                    <Text style={[AppStyles.normalText]}>暂无数据</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View />
        );
    }

    render() {
        let refreshProps = {
            refreshing: this.state.isRefresh,
            onRefresh: this.refresh,
            tintColor: AppColors.textHint,
            title: 'refreshing',
            colors: [AppColors.textDefault, AppColors.textHint]
        };

        return (
            <FlatList
                style={{ flex: 1 }}
                ref={ref => {
                    this.list = ref;
                }}
                ListEmptyComponent={this.renderEmpty()}
                removeClippedSubviews={true}
                {...refreshProps}
                onLayout={e => {
                    let _height = e.nativeEvent.layout.height;
                    if (this.state.listHeight < _height) {
                        this.setState({ listHeight: _height });
                    }
                }}
                renderItem={({ item, index }) =>
                    this.props.renderItem(item, index)
                }
                ListHeaderComponent={this.props.renderHeader}
                ItemSeparatorComponent={({ highlighted }) => <View />}
                enableEmptySections
                initialListSize={this.props.pageSize}
                pageSize={this.props.pageSize}
                initialNumToRender={10}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => this.loadMore()}
                ListFooterComponent={this.renderFooter}
                data={this.props.data}
            />
        );
    }

    showRefreshState() {
        this.setState({
            isRefresh: true
        });
    }

    scrollToTop() {
        if (this.props.data <= 0) {
            return;
        }
        if (this.list) {
            this.list.scrollToIndex({ index: 0, animate: false });
        }
    }

    refreshComplete(showLoadMore = false, scrollToTop = false) {
        console.log('=============pullRefreshComplete==============');
        this.setState({
            isRefreshing: false,
            isRefresh: false,
            showLoadMore: showLoadMore
        });
        if (scrollToTop) {
            this.scrollToTop();
        }
    }

    loadMoreComplete(showLoadMore = false) {
        this.setState({
            isRefreshing: false,
            showRefresh: true,
            showLoadMore: showLoadMore
        });
    }
}

PullLoadMoreListView.propTypes = {
    pageSize: PropTypes.number,
    data: PropTypes.any,
    refresh: PropTypes.func,
    loadMore: PropTypes.func,
    enableRefresh: PropTypes.bool,
    showListFooter: PropTypes.bool
};
PullLoadMoreListView.defaultProps = {
    pageSize: PAGE_SIZE,
    data: [],
    enableRefresh: true,
    showListFooter: true
};

export default PullLoadMoreListView;
