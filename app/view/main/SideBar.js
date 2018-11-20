import React from 'react';
import { AppRegistry, Image, StatusBar, Text } from 'react-native';
import { Container, Content, List, ListItem, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import BaseView from '@app/component/BaseView.js';
const routes = ['Home', 'Chat', 'Profile'];

export default class SideBar extends BaseView {
    render() {
        return (
            <Container>
                <Content>
                    <Button
                        dark
                        bordered
                        onPress={() => {
                            this.props.closeDrawer();
                            Actions.bulletinHome();
                        }}>
                        <Text>标讯</Text>
                    </Button>
                    <Button
                        dark
                        bordered
                        onPress={() => {
                            this.props.closeDrawer();
                            Actions.bulledin();
                        }}>
                        <Text>拟建</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
