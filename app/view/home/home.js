import React from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Footer, FooterTab, Button } from 'native-base';

import BaseView from '@app/component/BaseView';
import Main from '../main/home';
import BulletinHome from '../bulletin/home';
import PerformanceHome from '../performance/home';
import MineHome from '../mine/home';

export default class Home extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            main: true,
            bulletin: false,
            performance: false,
            mine: false,
            AppComponent: Main
        };
    }
    toggleTab(tab) {
        this.setState({
            main: false,
            bulletin: false,
            performance: false,
            mine: false
        });
        let _component = null;
        let _tab = tab;
        switch (tab) {
            case 'main':
                _component = Main;
                break;
            case 'bulletin':
                _component = BulletinHome;
                break;
            case 'performance':
                _component = PerformanceHome;
                break;
            case 'mine':
                _component = MineHome;
                break;
            default:
                _component = Main;
                _tab = 'main';
                break;
        }
        this.setState({
            [_tab]: true,
            AppComponent: _component
        });
    }
    render() {
        return (
            <Container>
                <View style={{ flex: 1, backgroundColor: 'red' }}>
                    <this.state.AppComponent />
                </View>
                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.main}
                            onPress={() => {
                                this.toggleTab('main');
                            }}>
                            <Text>易众标</Text>
                        </Button>
                        <Button
                            active={this.state.bulletin}
                            onPress={() => {
                                this.toggleTab('bulletin');
                            }}>
                            <Text>招标订阅</Text>
                        </Button>
                        <Button
                            active={this.state.performance}
                            onPress={() => {
                                this.toggleTab('performance');
                            }}>
                            <Text>业绩库</Text>
                        </Button>
                        <Button
                            active={this.state.mine}
                            onPress={() => {
                                this.toggleTab('mine');
                            }}>
                            <Text>我的</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
