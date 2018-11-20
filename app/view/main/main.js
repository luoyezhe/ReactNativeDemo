import React from 'react';
import { Text, View } from 'react-native';
import {
    Drawer,
    Container,
    Header,
    Content,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right
} from 'native-base';

import BaseView from '@app/component/BaseView';
import SideBar from './SideBar.js';

export default class Main extends BaseView {
    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }
    closeDrawer = () => {
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.drawer._root.open();
    };
    render() {
        return (
            <Drawer
                ref={ref => {
                    this.drawer = ref;
                }}
                content={<SideBar closeDrawer={this.closeDrawer} />}
                onClose={() => this.closeDrawer()}>
                <Container style={{ backgroundColor: '#ffff00' }}>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.openDrawer()}>
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
                    {/*<DrawerBody />*/}
                    {this.props.children}
                </Container>
            </Drawer>
        );
    }
}
