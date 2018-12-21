import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input, Label, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { storage } from '@app/storage/index.js';

import BaseView from '../../component/BaseView';
import { AppColors } from '../../style';
import * as accountActions from '@app/redux/action/account';
import Toast from '@app/component/common/toast';

class Register extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            cellphone: '18518572248',
            password: '',
            checkPass: '',
            captcha: ''
        };
        this.getCode = this.getCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backLogin = this.backLogin.bind(this);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Form>
                    <Item floatingLabel>
                        <Label>手机号</Label>
                        <Input
                            onChangeText={text => this.setState({ cellphone: text })}
                            value={this.state.cellphone}
                        />
                    </Item>
                    <Item style={[styles.codeContainer]}>
                        <Item floatingLabel style={[styles.inputCodeContainer]}>
                            <Label>验证码</Label>
                            <Input
                                onChangeText={text =>
                                    this.setState({ captcha: text })
                                }
                                value={this.state.captcha}
                            />
                        </Item>
                        <Button
                            style={[styles.btnCodeContainer]}
                            onPress={this.getCode}>
                            <Text>获取验证码</Text>
                        </Button>
                    </Item>
                    <Item floatingLabel>
                        <Label>密码</Label>
                        <Input
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                            value={this.state.password}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>确认密码</Label>
                        <Input
                            onChangeText={text =>
                                this.setState({ checkPass: text })
                            }
                            value={this.state.checkPass}
                        />
                    </Item>
                    <Item />
                </Form>
                <Button full style={[styles.btnLogin]} onPress={this.onSubmit}>
                    <Text>注册</Text>
                </Button>
                <Button
                    full
                    info
                    style={[styles.registerLogin]}
                    onPress={this.backLogin}>
                    <Text>返回登录</Text>
                </Button>
            </View>
        );
    }

    componentDidMount() {}

    valid() {
        let msg = '';
        if (!this.state.cellphone) {
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
    getCode() {
        console.log('getCode');
        if (!this.state.cellphone) {
            Toast.showToast('请输入手机号');
            return;
        }
        let { accountAction } = this.props;
        let data = {
            cellphone: this.state.cellphone,
            action: 'signup'
        };
        accountAction.getCaptcha(
            data,
            () => {
                Toast.showToast('发送成功');
            },
            error => {
                console.log('error', error);
                Toast.showToast(error.data.message || error.data);
            }
        );
    }
    onSubmit() {
        let _isCompleted = this.valid();
        if (!_isCompleted) {
            return;
        }
        let data = {
            cellphone: this.state.cellphone,
            password: this.state.password,
            code: this.state.captcha
        };
        let { accountAction } = this.props;
        accountAction.register(
            data,
            () => {
                Actions.reset('root');
            },
            error => {
                Toast.showToast(error.data.message);
            }
        );
    }
    backLogin() {
        Actions.pop();
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        accountAction: bindActionCreators(accountActions, dispatch)
    })
)(Register);

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
    },
    codeContainer: {
        marginTop: 25
    },
    inputCodeContainer: {
        flex: 1
    },
    btnCodeContainer: {
        width: 120,
        marginRight: 15
    }
});
