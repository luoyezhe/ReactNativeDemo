import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager } from 'react-native';

import { Actions } from 'react-native-router-flux';
// import { BulletinItem, Toast } from '@app/component';
import BulletinItem from '@app/component/bulletin/listItem.js';
import Toast from '@app/component/common/toast.js';

import api from '@app/api/bulletin';

export default class HotBulletin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.renderRow = this.renderRow.bind(this);
        this.getList = this.getList.bind(this);
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getList();
        });
    }

    getList() {
        api.getHotList()
            .then(res => {
                this.setState({
                    list: res.results
                });
            })
            .catch(error => {
                Toast.showToast(error.data.message);
            });
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
        return (
            <View>
                <Text>热门推荐</Text>
                <FlatList
                    style={{ flex: 1 }}
                    ref={ref => {
                        this.pullList = ref;
                    }}
                    data={this.state.list}
                    renderItem={({ item, index }) => this.renderRow(item)}
                />
            </View>
        );
    }
}
