import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Content } from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mainActions from '@app/redux/action/main';

import SelectArea from '../main/child/selectArea';

class AddRule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
        this.addRule = this.addRule.bind(this);
        this.showAreaModal = this.showAreaModal.bind(this);
        this.previewProject = this.previewProject.bind(this);
    }

    addRule() {
        console.log('addRule');
    }

    showAreaModal() {
        console.log('showAreaModal');
    }

    previewProject() {
        console.log('previewProject');
    }

    render() {
        return (
            <Content style={[styles.container]}>
                <Input
                    style={[styles.inputContainer]}
                    onChangeText={text => this.setState({ searchInput: text })}
                    value={this.state.searchInput}
                    clearButtonMode="while-editing"
                    onSubmitEditing={this.showAreaModal}
                    placeholder="输入您的项目关键词，如智慧城市"
                />
                <Button
                    style={[styles.addBtn]}
                    full
                    onPress={this.showAreaModal}>
                    <Text style={[styles.addBtnText]}>添加订阅</Text>
                </Button>
                <Button
                    full
                    style={[styles.previewBtn]}
                    onPress={this.previewProject}>
                    <Text style={[styles.previewBtnText]}>预览项目</Text>
                </Button>
            </Content>
        );
    }
}

export default connect(
    state => ({
        // TODO
    }),
    dispatch => ({
        mainAction: bindActionCreators(mainActions, dispatch)
    })
)(AddRule);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    inputContainer: {
        margin: 15,
        height: 40,
        backgroundColor: '#F7F7F7',
        color: '#fff',
        fontSize: 16
    },
    addBtn: {
        backgroundColor: '#3288FF',
        marginLeft: 15,
        marginRight: 15
    },
    addBtnText: {
        color: '#fff',
        fontSize: 16
    },
    previewBtn: {
        backgroundColor: '#fff',
        borderColor: '#3288FF',
        borderWidth: 1,
        margin: 15
    },
    previewBtnText: {
        color: '#3288FF',
        fontSize: 16
    }
});
