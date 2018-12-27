import React from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Item, Input, Label, Text, Button } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import storage from '@app/storage/DeviceStorage.js';

import BaseView from '@app/component/BaseView';
import { AppColors } from '@app/style';
import * as accountActions from '@app/redux/action/account';
import Toast from '@app/component/common/toast';

class Login extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            name: '18518572248',
            password: 'Abcd1234'
        };
        this.valid = this.valid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.register = this.register.bind(this);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Form>
                    <Item floatingLabel>
                        <Label>用户名</Label>
                        <Input
                            onChangeText={text => this.setState({ name: text })}
                            value={this.state.name}
                        />
                    </Item>
                    <Item floatingLabel last>
                        <Label>密码</Label>
                        <Input
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                            secureTextEntry={true}
                            value={this.state.password}
                        />
                    </Item>
                    <Item />
                </Form>
                <Button full style={[styles.btnLogin]} onPress={this.onSubmit}>
                    <Text>登录</Text>
                </Button>
                <Button
                    full
                    info
                    style={[styles.registerLogin]}
                    onPress={this.register}>
                    <Text>注册</Text>
                </Button>
            </View>
        );
    }

    componentDidMount() {
        storage.delete('token');
        let token = storage.get('token');
        console.log('token', token);
        console.log('token', typeof token);
    }

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
    valid() {
        let msg = '';
        if (!this.state.name) {
            msg = '请输入用户名';
        } else if (!this.state.password) {
            msg = '请输入密码';
        }
        if (msg) {
            Toast.showToast(msg);
            return false;
        }
        return true;
    }
    onSubmit() {
        let _isCompleted = this.valid();
        if (!_isCompleted) {
            return;
        }
        let data = {
            cellphone: this.state.name,
            password: this.state.password,
            schema_name: 'trial'
        };
        let { accountAction } = this.props;
        accountAction.login(
            data,
            res => {
                Actions.reset('root');
            },
            error => {
                Toast.showToast(error.data.message);
            }
        );
        // storage.save(
        //     'token',
        //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6InBia2RmMl9zaGEyNTYkMzAwMDAkSDRVYW5CR2lYbFlTJDFLRG9YdkNsZGVGQUJ0UlBaQUhiY3RmOHYvTkcyV21YSWo2bUltbGpYdjA9IiwidXNlcl9pZCI6MTQ4NzIsInBsYXRmb3JtIjoicGMifQ.oXxkhvYmhzc5vafIai8NKTGuqNAfS9XmFszt4tD-xsI'
        // );
        // storage.save('username', '18518572248');
        // Actions.reset('root');

        // Actions.bulletinOther();
        // Actions.reset('bulltinOther');
        // Actions.home();
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
    register() {
        Actions.register();
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        accountAction: bindActionCreators(accountActions, dispatch)
    })
)(Login);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    btnLogin: {
        margin: 20
    },
    registerLogin: {
        margin: 20,
        marginTop: 0
    }
});
