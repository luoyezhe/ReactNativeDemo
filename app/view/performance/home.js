import React from 'react';
import { View, Text } from 'react-native';
import BaseView from '@app/component/BaseView';

export default class PerformanceHome extends BaseView {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>业绩库</Text>
            </View>
        );
    }
}
