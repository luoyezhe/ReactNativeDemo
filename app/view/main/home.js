import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header } from 'native-base';
import BaseView from '@app/component/BaseView';

import HotBulletin from './hotBulletin';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Header />
                <View style={{ flex: 1 }}>
                    <HotBulletin />
                </View>
            </Container>
        );
    }
}
