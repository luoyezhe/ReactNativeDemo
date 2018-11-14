import React from 'react';
import { Text, View } from 'react-native';
import NavHeader from '@app/component/common/NavHeader.js';
import BaseView from '@app/component/BaseView';

export default class Main extends BaseView {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <NavHeader />
                <Text>首页啊</Text>
            </View>
        );
    }
}
