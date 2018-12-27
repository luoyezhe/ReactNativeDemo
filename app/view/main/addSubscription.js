import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Content, Input, Button, Icon } from 'native-base';
import { AppColors } from '@app/style';
import { Actions } from 'react-native-router-flux';

// 招投标-添加订阅
class AddSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
        this.searchAction = this.searchAction.bind(this);
        this.renderHotItems = this.renderHotItems.bind(this);
    }

    searchAction(item) {
        console.log('searchAction', item);
        Actions.push('searchAddSubscription', { searchInput: item });
        // Actions.push({
        //     sceneKey: 'searchAddSubscription',
        //     props: { searchInput: item }
        // });
    }

    renderHotItems() {
        const hotItems = [
            '智慧城市',
            '中央空调',
            '新风系统',
            '城市轨道交通',
            '城市绿化工程'
        ];
        let _itemsView = '';
        _itemsView = hotItems.map((item, index) => {
            return (
                <Text
                    style={[styles.hotItem]}
                    key={index}
                    onPress={() => this.searchAction(item)}>
                    {item}
                </Text>
            );
        });
        return (
            <View style={[styles.hotContainer]}>
                <Text>热门搜索</Text>
                <View style={styles.hotItems}>{_itemsView}</View>
            </View>
        );
    }

    render() {
        return (
            <Content style={[{ backgroundColor: AppColors.background }]}>
                <View style={[styles.searchWarp]}>
                    <Icon name="search" style={[{ fontSize: 14 }]} />
                    <Input
                        style={[{ fontSize: 14 }]}
                        placeholder="输入您想关注的项目，如智慧城市"
                        onChangeText={text =>
                            this.setState({ searchInput: text })
                        }
                        clearButtonMode="while-editing"
                        value={this.state.searchInput}
                        onSubmitEditing={this.searchAction}
                    />
                </View>
                {this.renderHotItems()}
            </Content>
        );
    }
}

export default AddSubscription;

const styles = StyleSheet.create({
    searchWarp: {
        backgroundColor: '#F7F7F7',
        height: 30,
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        margin: 10
    },
    hotContainer: {
        padding: 10
    },
    hotItems: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        flexWrap: 'wrap'
    },
    hotItem: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#F6F6F6',
        marginRight: 10,
        marginBottom: 10
    }
});
