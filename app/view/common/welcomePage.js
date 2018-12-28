import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
        this.toLogin = this.toLogin.bind(this);
    }

    toLogin() {}

    render() {
        return (
            <View>
                <Text>欢迎页面</Text>
                <Text
                    onPress={() => {
                        this.toLogin();
                    }}>
                    去登录
                </Text>
            </View>
        );
    }
}

export default WelcomePage;
