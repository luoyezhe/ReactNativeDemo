import React from 'react';
import { View, Text } from 'react-native';
import BaseView from '@app/component/BaseView';

export default class Main extends BaseView {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>易众标</Text>
            </View>
        );
    }
}
