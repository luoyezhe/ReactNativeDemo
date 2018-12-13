import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            checkPass: ''
        };
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
                </Content>
            </Container>
        );
    }
}
