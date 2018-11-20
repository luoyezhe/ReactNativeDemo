import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import BaseView from '@app/component/BaseView';
import Main from '@app/view/main/main.js';

// 拟建
export default class Bulledin extends BaseView {
    render() {
        return (
            <Main>
                <View style={{ backgroundColor: '#ff0000' }}>
                    <Text>拟建</Text>
                </View>
            </Main>
        );
    }
}

const styles = StyleSheet.create({
    bgStyle: {
        flex: 1
    }
});
