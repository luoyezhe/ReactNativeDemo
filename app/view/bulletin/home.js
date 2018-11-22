import React from 'react';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    View,
    Text
} from 'native-base';

import BaseView from '@app/component/BaseView';
import Main from '@app/view/main/main.js';
import Bulletin from '@app/view/bulletin/bulletin.js';
import Bidding from '@app/view/bulletin/bidding.js';
import Other from '@app/view/bulletin/other.js';

// 招投标Home
export default class BulletinHome extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            bulletin: true,
            bidding: false,
            other: false,
            AppComponent: Bulletin
        };
    }
    toggleTab(tab) {
        this.setState({
            bulletin: false,
            bidding: false,
            other: false
        });
        let _component = null;
        let _tab = tab;
        switch (tab) {
            case 'bulletin':
                _component = Bulletin;
                break;
            case 'bidding':
                _component = Bidding;
                break;
            case 'other':
                _component = Other;
                break;
            default:
                _component = Bulletin;
                _tab = 'bulletin';
                break;
        }
        this.setState({
            [_tab]: true,
            AppComponent: _component
        });
    }

    render() {
        return (
            <Main>
                <View style={{ backgroundColor: 'red', flex: 1 }}>
                    <this.state.AppComponent />
                </View>
                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.bulletin}
                            onPress={() => {
                                this.toggleTab('bulletin');
                            }}>
                            <Text>招标</Text>
                        </Button>
                        <Button
                            active={this.state.bidding}
                            onPress={() => {
                                this.toggleTab('bidding');
                            }}>
                            <Text>中标</Text>
                        </Button>
                        <Button
                            active={this.state.other}
                            onPress={() => {
                                this.toggleTab('other');
                            }}>
                            <Text>其他</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Main>
        );
    }
}
