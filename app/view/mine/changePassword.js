import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Text,
    Button,
    Label
} from 'native-base';
import { AppSizes } from '@app/style';
import api from '@app/api/account';
import Toast from '@app/component/common/toast.js';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            checkPass: ''
        };
        this.submitForm = this.submitForm.bind(this);
        this.validForm = this.validForm.bind(this);
    }

    validForm() {
        let msg = '';
        if (this.state.newPass !== this.state.checkPass) {
            msg = '新密码和确认密码要相同';
        }
        if (msg) {
            Toast.showToast(msg);
            return false;
        }
        return true;
    }

    // 确定修改密码
    submitForm() {
        let isValid = this.validForm();
        if (!isValid) {
            return;
        }
        console.log('submitForm');
        let data = {
            old_password: this.state.oldPass,
            password: this.state.newPass
        };
        api.changePassword(data)
            .then(res => {
                Toast.showToast('修改成功');
            })
            .catch(error => {
                console.log(error);
                Toast.showToast(error.data.message);
            });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>旧密码</Label>
                            <Input
                                onChangeText={oldPass =>
                                    this.setState({ oldPass })
                                }
                                value={this.state.oldPass}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>新密码</Label>
                            <Input
                                onChangeText={newPass =>
                                    this.setState({ newPass })
                                }
                                value={this.state.newPass}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>再次输入新密码</Label>
                            <Input
                                onChangeText={checkPass =>
                                    this.setState({ checkPass })
                                }
                                value={this.state.checkPass}
                            />
                        </Item>
                    </Form>
                    <Button
                        style={styles.btn}
                        onPress={() => {
                            this.submitForm();
                        }}>
                        <Text>确定</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        margin: 15,
        marginTop: 30,
        justifyContent: 'center',
        width: AppSizes.screen.width - 30
    }
});
