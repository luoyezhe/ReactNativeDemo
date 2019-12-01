import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import BaseView from '@app/component/BaseView';
import FadeInView from './FadeInView';

// demo页面
export default class Test extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false
        };
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={[styles.container1]} />
                <View style={[styles.container2]} />
                <View style={[styles.container3]} />
                {/*<FadeInView style={[styles.container4]} />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // justifyContent: 'space-evenly'
    },
    container1: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    container2: {
        width: 70,
        height: 70,
        backgroundColor: 'blue'
    },
    container3: {
        width: 100,
        height: 100,
        ...Platform.select({
            ios: {
                backgroundColor: 'green'
            },
            android: {
                backgroundColor: 'green'
            }
        })
    },
    container4: {
        height: 150,
        width: 150,
        backgroundColor: 'red'
    }
});
