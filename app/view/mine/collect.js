import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Tabs, Tab, Container, Header, Content } from 'native-base';

import BulletinCollect from './child/bulletinCollect';
import OrgCollect from './child/orgCollect';

class Collect extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Tabs tabBarPosition="overlayTop">
                    <Tab heading="我的项目">
                        <BulletinCollect />
                    </Tab>
                    <Tab heading="我的企业">
                        <OrgCollect />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

export default Collect;
