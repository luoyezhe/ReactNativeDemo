import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Toast from '@app/component/common/toast.js';
import PersonInfo from './info';
import storage from '@app/storage/DeviceStorage.js';

export default class MineHome extends React.Component {
    constructor(props) {
        super(props);
        this.exitDialog = this.exitDialog.bind(this);
    }

    render() {
        return (
            <View>
                <PersonInfo />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Actions.push('collect');
                    }}>
                    <View style={styles.colItem}>
                        <Text>我的收藏</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Actions.push('changePassword');
                    }}>
                    <View style={[styles.colItem]}>
                        <Text>修改密码</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this.exitDialog.bind(this)}>
                    <View style={[styles.colItem, { alignItems: 'center' }]}>
                        <Text>退出</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    exitDialog() {
        Alert.alert('确认退出吗？', '', [
            {
                text: '取消',
                onPress: () => {
                    Toast.showToast('已取消');
                }
            },
            {
                text: '确定',
                onPress: () => {
                    storage.delete('token');
                    Toast.showToast('退出成功');
                    Actions.reset('login');
                }
            }
        ]);
    }
}

const styles = StyleSheet.create({
    colItem: {
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'center',
        marginTop: 15
    }
});
