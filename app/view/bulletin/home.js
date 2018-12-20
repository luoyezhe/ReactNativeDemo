import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    Container,
    Content,
    Header,
    Footer,
    FooterTab,
    Button
} from 'native-base';

import Bulletin from './bulletin';

// 招投标Home
export default class BulletinHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Bulletin />
            </View>
        );
    }
}
