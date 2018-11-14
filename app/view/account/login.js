import React from 'react';
import { View } from 'react-native';
import {
    Button,
    FormLabel,
    FormInput,
    FormValidationMessage,
    Text
} from 'react-native-elements';
import { storage } from '@app/storage/index.js';

import BaseView from '@app/component/BaseView';
import { AppColors } from '@app/style';
import api from '@app/api/account';
import { Actions } from 'react-native-router-flux';

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
                <FormInput onChangeText={this.onUsernameChange.bind(this)} />

                <FormLabel>密码</FormLabel>
                <FormInput onChangeText={this.onPasswordChange.bind(this)} />
                <Text />
                <Button
                    title="登录"
                    buttonStyle={{ marginTop: 10 }}
                    backgroundColor={AppColors.brand.primary}
                    onPress={this.onSubmit.bind(this)}
                />
            </View>
        );
    }

    componentDidMount() {}

    onUsernameChange(text) {
        // this.props.usernameChanged(text);
        this.setState({
            name: text
        });
    }

    onPasswordChange(text) {
        // this.props.usernameChanged(text);
        this.setState({
            password: text
        });
    }

    onSubmit() {
        storage.save(
            'token',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBia2RmMl9zaGEyNTYkMzAwMDAkSDRVYW5CR2lYbFlTJDFLRG9YdkNsZGVGQUJ0UlBaQUhiY3RmOHYvTkcyV21YSWo2bUltbGpYdjA9IiwidXNlcl9pZCI6MTQ4NzIsInBsYXRmb3JtIjoicGMifQ.oXxkhvYmhzc5vafIai8NKTGuqNAfS9XmFszt4tD-xsI'
        );
        storage.save('username', '18518572248');

        Actions.home();

        // showToast('submit');
        // let data = {
        // 		cellphone: this.state.name,
        // 		password: this.state.password
        // }
        // console.log(data);
        // api.login(data)
        // 		.then((res) => {
        // 				showToast(res.token)
        // 		})
        // 		.catch((error) => {
        // 				showToast(error.data.message)
        // 		})
    }
}
