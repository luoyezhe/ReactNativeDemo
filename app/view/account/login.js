// import BaseView from '../../component/BaseView'
import React, { Component } from 'react';
import {
		View
} from 'react-native';
import {
		Container,
		Content,
		Form,
		Item,
		Input,
		Icon
} from 'native-base';

import { Button, FormLabel, FormInput, FormValidationMessage, Text } from 'react-native-elements';

import BaseView from '../../component/BaseView';
import { AppColors } from '../../style'
import showToast from '../../utils/toast';
import api from '../../api/account'

export default class Login extends BaseView {
		constructor(props) {
				super(props);
				this.state = {
						name: '18518572248',
						password: '123456'
				};
		}

		render() {
				return (
						<View>
								<FormLabel>用户名</FormLabel>
								<FormInput onChangeText={this.onUsernameChange.bind(this)}></FormInput>

								<FormLabel>密码</FormLabel>
								<FormInput onChangeText={this.onPasswordChange.bind(this)}></FormInput>
								<Text>
								</Text>
								<Button
										title='登录'
										buttonStyle={{marginTop: 10}}
										backgroundColor={AppColors.brand.primary}
										onPress={this.onSubmit.bind(this)}
								>

								</Button>
						</View>
				);
		}

		componentDidMount () {
		}

		onUsernameChange(text) {
				// this.props.usernameChanged(text);
				this.setState({
						name: text
				})
		}
		onPasswordChange(text) {
				// this.props.usernameChanged(text);
				this.setState({
						password: text
				})
		}
		onSubmit () {
				showToast('submit')
				let data = {
						cellphone: this.state.name,
						password: this.state.password
				}
				console.log(data)
				api.login(data)
						.then((res) => {
								showToast(res.token)
						})
						.catch((error) => {
								showToast(error.data.message)
						})
		}
}
