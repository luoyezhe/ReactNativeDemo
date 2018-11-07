import React from 'react';
import BaseView from '@app/component/BaseView'
import NavHeader from '@app/component/common/NavHeader.js'

import {
		Text,
		View
} from 'react-native'

export default class Main extends BaseView {
		constructor (props) {
				super(props);
		}

		render () {
				return (
						<View>
								<NavHeader/>
								<Text>首页啊</Text>
						</View>
				)
		}

}
