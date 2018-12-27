import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    InteractionManager,
    StatusBar,
    StyleSheet
} from 'react-native';
import { Icon } from 'native-base';

import { Actions } from 'react-native-router-flux';
// import { BulletinItem, Toast } from '@app/component';
import BulletinItem from '@app/component/bulletin/listItem.js';
import PullListView from '@app/component/common/PullLoadMoreListView';
import Toast from '@app/component/common/toast.js';
import { AppColors, AppStyles } from '@app/style';
import api from '@app/api/bulletin';

export default class HotBulletin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.renderRow = this.renderRow.bind(this);
        this.refresh = this.refresh.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.goToSearch = this.goToSearch.bind(this);
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.refreshData();
        });
    }
    goToSearch() {
        Actions.push('searchSubscription');
    }
    refreshData() {
        if (this.pullList) {
            this.pullList.showRefreshState();
        }
        this.refresh();
    }
    refresh() {
        api.getHotList()
            .then(res => {
                this.pullList.refreshComplete(false);
                this.setState({
                    list: res.results
                });
            })
            .catch(error => {
                Toast.showToast(error.data.message);
            });
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
        return (
            <View style={[AppStyles.grayPageBackground]}>
                <StatusBar
                    hidden={false}
                    backgroundColor={'transparent'}
                    translucent
                    barStyle={'light-content'}
                />
                <View style={styles.searchWarp}>
                    <Text style={styles.search} onPress={this.goToSearch}>
                        <Icon name="search" style={{ fontSize: 14 }} />
                        输入您想关注的项目，如智慧城市
                    </Text>
                </View>
                <Text style={styles.header}>热门推荐</Text>
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
    searchWarp: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 15
    },
    search: {
        borderColor: AppColors.borderColor,
        borderWidth: 1,
        alignItems: 'center',
        padding: 10,
        color: AppColors.textHint
    },
    header: {
        backgroundColor: '#fff',
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold'
    }
});
