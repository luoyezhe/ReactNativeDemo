import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Footer, FooterTab, Button } from 'native-base';

import BaseView from '@app/component/BaseView';

// 招投标Home
export default class BulletinHome extends BaseView {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>招投标</Text>
            </View>
        );
    }
}
