import React from 'react';
import { View } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import BaseView from '@app/component/BaseView.js';

export default class NavHeader extends BaseView {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={() => this.props.openDrawer()}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title || 'e众标'}</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name="home" />
                    </Button>
                </Right>
            </Header>
        );
    }
}
