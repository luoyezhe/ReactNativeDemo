import React from 'react';
import { Text, View } from 'react-native';

import BaseView from '@app/component/BaseView';

export default class DrawerBody extends BaseView {
    render() {
        return <View>{this.props.children}</View>;
    }
}
