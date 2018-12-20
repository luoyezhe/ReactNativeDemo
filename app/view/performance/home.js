import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BaseView from '@app/component/BaseView';
import PerformanceList from './performanceList';

export default class PerformanceHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <PerformanceList />
            </View>
        );
    }
}
