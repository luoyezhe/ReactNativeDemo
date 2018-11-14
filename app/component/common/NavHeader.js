import React from 'react';
import { Header } from 'react-native-elements';

import BaseView from '@app/component/BaseView.js';

export default class NavHeader extends BaseView {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'e众标', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
        );
    }
}
