import React, { Component } from 'react';
import { View } from 'react-native';

import { Text } from 'native-base';

import { getNewsVersion } from '@app/utils/checkVersion.js';

// 关于
class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text
                    onPress={() => {
                        getNewsVersion();
                    }}>
                    检查更新
                </Text>
            </View>
        );
    }
}

export default AboutPage;
